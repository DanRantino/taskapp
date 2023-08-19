'use server';
import { revalidatePath } from 'next/cache';
import { createServerClient } from '../serverClient';

export async function getTasks() {
  const supabase = createServerClient();
  revalidatePath('/');
  return await supabase.from('tasks').select('*, profiles( username  ) ');
}

export async function doneTask(id: string | undefined, done: boolean) {
  const supabase = createServerClient();
  if (!id) return null;
  console.log('🚀 ~ file: actions.ts:16 ~ doneTask ~ done:', done);

  const ret = await supabase.from('tasks').update({ done }).eq('id', 'f154a4f3-59fa-41d0-86e4-7aa57274f218');
  console.log('🚀 ~ file: actions.ts:17 ~ doneTask ~ ret:', ret);
}

export async function deleteById(id: string | undefined) {
  const supabase = createServerClient();
  if (!id) return null;
  const ret = await supabase.from('tasks').delete().eq('id', id);
  revalidatePath('/');
}

export async function getTaskById(id: string | null) {
  const supabase = createServerClient();
  if (!id) return null;
  const data = (await supabase.from('tasks').select('*, profiles( username  )').eq('id', id).single()).data;
  return data;
}
