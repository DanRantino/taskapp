'use client';
import Skeleton from '@/components/ui/Skeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
import { getTaskById, updateTask } from '@/server/tasks/actions';
import { useRouter } from 'next/navigation';
import { getProfiles } from '@/server/profile/actions';
import { getProjects } from '@/server/projects/actions';

const formSchema = z.object({
  task: z.string().nonempty().nullish(),
  profiles: z
    .object({
      username: z.string().nonempty(),
    })
    .nullish(),
  status: z
    .union([
      z.literal('BACKLOG'),
      z.literal('PENDING'),
      z.literal('IN PROGRESS'),
      z.literal('COMPLETED'),
      z.literal('TO DO'),
    ])
    .nullish(),
  projectId: z.string().nullish(),
});

type Props = {
  id: string;
};

const statuses = ['BACKLOG', 'PENDING', 'IN PROGRESS', 'COMPLETED', 'TO DO'];

function TaskForm({ id }: Props) {
  const { data } = useQuery(['task', id], () => getTaskById(id));
  const queryClient = useQueryClient();
  const {
    isFetching: isFetchingProfile,
    isLoading: isLoadingProfile,
    data: profiles,
  } = useQuery(['profiles'], getProfiles, {
    refetchOnWindowFocus: false,
  });
  const { data: projects } = useQuery(['projects'], getProjects);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profiles: null,
      status: null,
      task: null,
      projectId: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const ret = await updateTask(id, values.task, values.status, values.profiles?.username, values.projectId);
    console.log('🚀 ~ file: task-form.tsx:67 ~ onSubmit ~ ret:', ret);
    queryClient.invalidateQueries(['tasks']);
  }

  function defaultValue() {
    form.reset({
      profiles: data?.profiles,
      status: data?.status,
      task: data?.task,
      projectId: data?.project?.toString(),
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
          <div className="flex space-x-4 space-y-8">
            <FormField
              control={form.control}
              name="profiles.username"
              render={({ field }) => {
                return (
                  <FormItem className="pt-8">
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
                          <SelectItem key={profile.username} value={profile.username}>
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
            <FormField
              control={form.control}
              name="projectId"
              render={({ field, formState }) => {
                return (
                  <FormItem>
                    <FormLabel>Pojects</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={field.value?.toString()} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {projects?.data?.map(project => (
                            <SelectItem key={project.id} value={project.id.toString()!}>
                              {project?.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
