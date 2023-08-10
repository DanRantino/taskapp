import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase.types';

export const createBrowserClient = () => createClientComponentClient<Database>();
