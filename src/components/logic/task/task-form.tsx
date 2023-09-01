'use client';
import Skeleton from '@/components/ui/Skeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { getTaskById, updateTask } from '@/server/tasks/actions';
import { getProfiles } from '@/server/profile/actions';
import { getProjects } from '@/server/projects/actions';
import { formSchema } from '@/lib/schemas';
import SelectProjects from '../select/select-projects';
import SelectStatus from '../select/select-status';
import SelectProfile from '../select/select-profile';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  id: string;
};

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
            <SelectProfile form={form} profiles={profiles} />
            <SelectStatus form={form} />
            <SelectProjects form={form} projects={projects} />
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
