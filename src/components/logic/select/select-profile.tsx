import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectContent, SelectGroup, SelectItem, Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as z from 'zod';

import React from 'react';
import { formSchema } from '@/lib/schemas';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
type Props = {
  form: {
    control: Control<z.infer<typeof formSchema>>;
  };
  profiles: PostgrestSingleResponse<{ username: string }[]> | undefined;
};

function SelectProfile({ form, profiles }: Props) {
  return (
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
                  <SelectValue placeholder={'Teste'} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={''}>{'----'}</SelectItem>
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
  );
}

export default SelectProfile;
