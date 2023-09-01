import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectContent, SelectGroup, SelectItem, Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import * as z from 'zod';

import React from 'react';
import { formSchema } from '@/lib/schemas';
import { Control } from 'react-hook-form';

type Props = {
  form: {
    control: Control<z.infer<typeof formSchema>>;
  };
  projects:
    | PostgrestSingleResponse<
        {
          id: number;
          name: string;
        }[]
      >
    | undefined;
};
function SelectProjects({ form, projects }: Props) {
  return (
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
  );
}

export default SelectProjects;
