'use client';
import Task from '@/components/logic/task/task';
import TaskForm from '@/components/logic/task/task-form';
import { columns } from '@/components/logic/tasksTable/columns';
import { TableTasks } from '@/components/logic/tasksTable/data-table';
import { getTasks } from '@/server/tasks/actions';
import { TTasks } from '@/types/tasks.types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export default function Index({}: Props) {
  const { data: tasks } = useQuery(['tasks'], getTasks);
  const params = useSearchParams();
  const id = params.get('id');
  return (
    <>
      <section className="flex items-center justify-center h-fit w-full">
        {!tasks ? <h1>Loading...</h1> : <TableTasks columns={columns} data={tasks.data as TTasks[]} />}
      </section>
      <section className="flex items-center justify-center h-2/6 w-full pt-4 pb-8">{id && <Task id={id} />}</section>
    </>
  );
}
