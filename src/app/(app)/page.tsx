import { columns } from '@/components/logic/tasksTable/columns';
import { TableTasks } from '@/components/logic/tasksTable/data-table';
import { getTasks } from '@/server/tasks/actions';

export default async function Index() {
  const { data: tasks } = await getTasks();

  return (
    <div className="flex flex-col items-center overflow-auto w-full h-screen">
      {!tasks ? <h1>Loading...</h1> : <TableTasks columns={columns} data={tasks} />}
    </div>
  );
}
