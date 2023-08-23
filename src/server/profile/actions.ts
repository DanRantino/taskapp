'use server';
import { createServerClient } from '../serverClient';

export async function getProfile() {
  const supabase = createServerClient();

  const { data } = await supabase.auth.getSession();

  const { data: profile, status } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.session?.user.id)
    .single();
  return { profile, status };
}

export async function getProfiles() {
  const supabase = createServerClient();
  return await supabase.from('profiles').select(' username ');
}
