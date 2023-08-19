'use client';
import TaskForm from '@/components/logic/task/task-form';
import { columns } from '@/components/logic/tasksTable/columns';
import { TableTasks } from '@/components/logic/tasksTable/data-table';
import { getTasks } from '@/server/tasks/actions';
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
    <div className="flex flex-col items-center overflow-auto w-screen h-screen">
      <section className="flex items-center justify-center h-4/6 w-full">
        {!tasks ? <h1>Loading...</h1> : <TableTasks columns={columns} data={tasks.data} />}
      </section>
      <section className="flex items-center justify-center h-2/6 w-full">{id && <TaskForm id={id} />}</section>
    </div>
  );
}
