'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/data-table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TableTasks<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  return (
    <div className="w-3/4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
