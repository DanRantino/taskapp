export type TTasks = {
  created_at?: string | null;
  done?: boolean | null;
  id?: string | null;
  project_id?: number | null;
  task?: string | null;
  user_id?: string | null;
  status?: string | null;
};

export type TStatus = 'BACKLOG' | 'PENDING' | 'IN PROGRESS' | 'COMPLETED' | 'TO DO';
