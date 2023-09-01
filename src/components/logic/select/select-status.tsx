import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectContent, SelectGroup, SelectItem, Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as z from 'zod';

import React from 'react';
import { formSchema } from '@/lib/schemas';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
type Props = {
  form: {
    control: Control<z.infer<typeof formSchema>>;
  };
};

const statuses = ['BACKLOG', 'PENDING', 'IN PROGRESS', 'COMPLETED', 'TO DO'];

function SelectStatus({ form }: Props) {
  return (
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
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default SelectStatus;
