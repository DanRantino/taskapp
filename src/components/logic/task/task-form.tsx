'use client';
import Skeleton from '@/components/ui/Skeleton';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@/server/browserClient';

const formSchema = z.object({
  task: z.string().nonempty().nullish(),
  profiles: z
    .object({
      username: z.string().nonempty(),
    })
    .nullish(),
  status: z.string().nonempty().nullish(),
});

type Props = {
  id: string;
};

const statuses = ['BACKLOG', 'PENDING', 'IN PROGRESS', 'COMPLETED', 'TO DO'];
export async function getProfiles() {
  const supabase = createBrowserClient();
  return await supabase.from('profiles').select('*');
}
async function getTaskById(id: string | null) {
  const supabase = createBrowserClient();
  if (!id) return null;
  const data = (await supabase.from('tasks').select('*, profiles( username  )').eq('id', id).single()).data;
  return data;
}

function TaskForm({ id }: Props) {
  const { data } = useQuery(['task', id], () => getTaskById(id));

  const {
    isFetching: isFetchingProfile,
    isLoading: isLoadingProfile,
    data: profiles,
  } = useQuery(['profiles'], getProfiles, {
    refetchOnWindowFocus: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profiles: null,
      status: null,
      task: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert('submit');
  }

  function defaultValue() {
    form.reset({
      profiles: data?.profiles,
      status: data?.status,
      task: data?.task,
    });
  }

  useEffect(() => {
    defaultValue();
  }, [data]);

  // useEffect(() => {}, [form.getValues()]);

  if (!id) {
    return null;
  }
  if (isFetchingProfile || isLoadingProfile)
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <div className="w-3/4 h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value?.valueOf()} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="profiles.username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>User</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value=""> </SelectItem>
                        {profiles?.data?.map(profile => (
                          <SelectItem key={profile.id} value={profile.username}>
                            {profile.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field, formState }) => {
                return (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value?.valueOf()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              <p
                                className={cn('font-medium', {
                                  'text-green-500': field.value === 'COMPLETED',
                                  'text-red-500': field.value === 'PENDING',
                                  'text-yellow-500': field.value === 'IN PROGRESS',
                                  'text-gray-500': field.value === 'TO DO',
                                  'text-blue-500': field.value === 'BACKLOG',
                                })}
                              >
                                {field.value}
                              </p>
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {statuses.map(status => (
                            <SelectItem
                              className={cn('font-medium', {
                                'text-green-500': status === 'COMPLETED',
                                'text-red-500': status === 'PENDING',
                                'text-yellow-500': status === 'IN PROGRESS',
                                'text-gray-500': status === 'TO DO',
                                'text-blue-500': status === 'BACKLOG',
                              })}
                              key={status}
                              value={status}
                            >
                              {status}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="w-3/4 flex justify-evenly pt-4">
            <Button type="submit" variant="default">
              Submit
            </Button>
            <Button onClick={defaultValue} type="reset" variant={'link'}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default TaskForm;
