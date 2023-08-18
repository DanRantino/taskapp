'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { TTasks } from '@/types/tasks.types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { FileEdit, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

//TODO: adicionar edit task https://ui.shadcn.com/docs/components/data-table#row-actions

//TODO: novo modo de apresentar o status das tarefas

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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'task',
    header: 'Task',
    cell: info => <div className="w-96">{info.getValue() as string}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'profiles.username',
    header: 'User',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'created_at',
    header: 'Created at',
    cell: info => formataData(info.getValue() as string),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
              <MoreHorizontal className="mr-2 h-4 w-4" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {}}>
              <Link href={`/${id}`} className="flex w-full justify-evenly">
                <FileEdit />
                <span>Edit task</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
