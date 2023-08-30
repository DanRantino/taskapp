'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/ui/table-view-options';
import { DataTableFacetedFilter } from '@/components/ui/table-facet-filter';
import { useQuery } from '@tanstack/react-query';
import { getProfiles } from '@/server/profile/actions';
import { useState } from 'react';
import { getProjects } from '@/server/projects/actions';

// import { priorities, statuses } from '../data/data';
// import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [filterProfiles, setFilterProfiles] = useState<
    {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[]
  >([]);
  const [filterProjects, setFilterProjects] = useState<
    {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[]
  >([]);
  const { data: profiles } = useQuery(['profiles'], async () => {
    const { data } = await getProfiles();
    let arr: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[] = [];
    data?.forEach(profile => {
      arr.push({ label: profile.username, value: profile.username });
    });
    setFilterProfiles(arr);
    return { data };
  });
  const { data: projects } = useQuery(['projects'], async () => {
    const { data } = await getProjects();
    let arr: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[] = [];
    data?.forEach(project => {
      if (project.projects?.name) arr.push({ label: project.projects?.name, value: project.projects?.name });
    });
    setFilterProjects(arr);
    return { data };
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn('task')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('task')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={[
              {
                label: 'DONE',
                value: 'DONE',
              },
              {
                label: 'TO DO',
                value: 'TO DO',
              },
              {
                label: 'IN PROGRESS',
                value: 'IN PROGRESS',
              },
              {
                label: 'DONE',
                value: 'DONE',
              },
              {
                label: 'PENDING',
                value: 'PENDING',
              },
              {
                label: 'COMPLETED',
                value: 'COMPLETED',
              },
              {
                label: 'BACKLOG',
                value: 'BACKLOG',
              },
            ]}
          />
        )}
        {profiles?.data && table.getColumn('profiles_username') && (
          <DataTableFacetedFilter column={table.getColumn('profiles_username')} title="User" options={filterProfiles} />
        )}
        {projects?.data && table.getColumn('link_project_projects.name') && (
          <DataTableFacetedFilter
            column={table.getColumn('link_project_projects.name')}
            title="Project"
            options={filterProjects}
          />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
