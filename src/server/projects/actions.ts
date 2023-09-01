'use server';

import { createServerClient } from '../serverClient';

export async function getProjects() {
  const supabase = createServerClient();
  return await supabase.from('projects').select(' id,name ');
}
