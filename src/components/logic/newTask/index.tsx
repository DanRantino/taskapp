'use client';
import { Button } from '@/components/ui/button';
import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/lib/schemas';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfiles } from '@/server/profile/actions';
import { getProjects } from '@/server/projects/actions';
import SelectProjects from '../select/select-projects';
import SelectStatus from '../select/select-status';
import SelectProfile from '../select/select-profile';
import { createTask } from '@/server/tasks/actions';
import { useRef } from 'react';

function NewTask({}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { data: profiles } = useQuery(['profiles'], getProfiles);
  const { data: projects } = useQuery(['projects'], getProjects);
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation((v: z.infer<typeof formSchema>) =>
    createTask(v.task, v.status, v.profiles?.username, v.projectId),
  );

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
    await mutateAsync(values);
    form.reset({
      profiles: null,
      status: null,
      task: null,
      projectId: null,
    });
    ref.current?.click();
    queryClient.invalidateQueries(['tasks']);
  }
  return (
    <div className="absolute right-10 bottom-10 ">
      <Dialog>
        <DialogTrigger ref={ref} asChild>
          <Button variant="outline" size="icon">
            <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-fit">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Add a new task</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
              <div className="flex flex-col w-full h-fit">
                <div>
                  <FormField
                    control={form.control}
                    name="task"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task</FormLabel>
                        <FormControl>
                          <Textarea {...field} value={field.value?.valueOf()} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-1 justify-around w-full">
                  <div className="w-1/3">
                    <SelectProfile form={form} profiles={profiles} />
                  </div>
                  <div className="pt-8 w-1/3">
                    <SelectStatus form={form} />
                  </div>
                  <div className="pt-8 w-1/3">
                    <SelectProjects form={form} projects={projects} />
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-6">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <ReloadIcon className="animate-spin" />}
                  Add
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewTask;
