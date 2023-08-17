'use server';
import { revalidatePath } from 'next/cache';
import { createServerClient } from '../serverClient';

export async function getTasks() {
  const supabase = createServerClient();
  revalidatePath('/');
  return await supabase.from('tasks').select('*, profiles( username  ) ');
}
