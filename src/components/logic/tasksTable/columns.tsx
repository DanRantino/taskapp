'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { TTasks } from '@/types/tasks.types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@/server/browserClient';

export const columns: ColumnDef<TTasks>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'done',
    header: 'Done',
    cell: info => <Checkbox checked={info.getValue() as boolean} disabled />,
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
    cell: info => (
      <p
        className={cn('font-medium', {
          'text-green-500': info.getValue() === 'completed',
          'text-red-500': info.getValue() === 'pending',
          'text-yellow-500': info.getValue() === 'in progress',
          'text-gray-500': info.getValue() === 'to do',
          'text-blue-500': info.getValue() === 'backlog',
        })}
      >
        {String(info.getValue()).toUpperCase() as string}
      </p>
    ),
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
