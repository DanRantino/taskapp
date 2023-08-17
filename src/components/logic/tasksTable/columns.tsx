'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { TTasks } from '@/types/tasks.types';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<TTasks>[] = [
  {
    accessorKey: 'done',
    header: 'Done',
    cell: info => <Checkbox checked={info.getValue() as boolean} onCheckedChange={console.log} />,
  },
  {
    accessorKey: 'task',
    header: 'Task',
    cell: info => <div className="w-96">{info.getValue() as string}</div>,
  },
  {
    accessorKey: 'profiles.username',
    header: 'User',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },

  {
    accessorKey: 'created_at',
    header: 'Created at',
    cell: info => formataData(info.getValue() as string),
  },
];

function formataData(inputDateString: string) {
  const inputDate = new Date(inputDateString);

  const day = String(inputDate.getDate()).padStart(2, '0');
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const year = inputDate.getFullYear();
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
