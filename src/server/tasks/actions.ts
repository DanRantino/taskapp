'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createServerClient } from '../serverClient';

export async function getTasks() {
  const supabase = createServerClient();
  revalidatePath('/');
  return await supabase.from('tasks').select('*, profiles( username  ) ');
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

export async function updateTask(
  id: string | null,
  task: string | null | undefined,
  status: 'BACKLOG' | 'PENDING' | 'IN PROGRESS' | 'COMPLETED' | 'TO DO' | null | undefined,
  username: string | null | undefined,
) {
  const supabase = createServerClient();
  if (!id) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('username', username).single();
  if (!data) return null;
  await supabase.from('tasks').update({ task, status, user_id: data.id }).eq('id', id);
}
