'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createServerClient } from '../serverClient';
import { TStatus } from '@/types/tasks.types';

export async function getTasks() {
  const supabase = createServerClient();
  revalidatePath('/');
  return await supabase.from('tasks').select('*, profiles( username  ), link_project (  projects ( name ) ) ');
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
  const data = (
    await supabase
      .from('tasks')
      .select('*, profiles( username  ), link_project (  projects ( id,name ) )')
      .eq('id', id)
      .single()
  ).data;
  return data;
}

export async function updateTask(
  id: string | null,
  task: string | null | undefined,
  status: TStatus | null | undefined,
  username: string | null | undefined,
) {
  const supabase = createServerClient();
  if (!id) return null;
  const { data } = await supabase.from('profiles').select('*').eq('username', username).single();
  if (!data) return null;
  return await supabase.from('tasks').update({ task, status, user_id: data.id }).eq('id', id);
}
