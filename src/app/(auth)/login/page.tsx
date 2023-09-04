'use client';
import Messages from './messages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Minimo 6 caracteres'),
});

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const form = new FormData();
    form.append('email', values.email);
    form.append('password', values.password);
    const data = await fetch('/auth/sign-in', {
      method: 'POST',

      body: form,
    });
    router.push('/');
  }

  return (
    <div className="flex-1 flex flex-col w-screen px-8 sm:max-w-md justify-center gap-2">
      <Form {...form}>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="rounded-md px-4 py-2 bg-inherit border mb-6" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="rounded-md px-4 py-2 bg-inherit border mb-6" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="default"
            disabled={form.formState.isSubmitting}
            className="bg-green-700 rounded px-4 py-2 text-white mb-2"
          >
            {form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          <Button variant={'link'} type="button" asChild>
            <Link href={'/sign-up'}>Sign Up</Link>
          </Button>
          <Messages />
        </form>
      </Form>
    </div>
  );
}
