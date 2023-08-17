import { columns } from '@/components/logic/tasksTable/columns';
import { TableTasks } from '@/components/logic/tasksTable/data-table';
import { getTasks } from '@/server/tasks/actions';

export default async function Index() {
  const { data: tasks } = await getTasks();

  return (
    <div className="w-full h-3/4 flex flex-col items-center  overflow-auto">
      {!tasks ? <h1>Loading...</h1> : <TableTasks columns={columns} data={tasks} />}
    </div>
  );
}
