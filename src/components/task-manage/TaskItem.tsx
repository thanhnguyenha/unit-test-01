import type { Task, TaskStatus } from './task-type';

const STATUS_LABEL: Record<Task['status'], string> = {
  open: 'Chưa làm',
  doing: 'Đang làm',
  done: 'Đã xong',
};

const STATUS_STYLE: Record<Task['status'], string> = {
  open: 'bg-gray-100 text-gray-800',
  doing: 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
};

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onChangeStatus: (id: number, status: TaskStatus) => void;
}

const TaskItem = ({ task, onDelete, onChangeStatus }: TaskItemProps) => {
  const handleChangeStatus = () => {
    const newStatus = task.status === 'open' ? 'doing' : task.status === 'doing' ? 'done' : 'open';
    onChangeStatus(task.id, newStatus);
  };

  return (
    <li className="list-none p-4 border border-gray-200 rounded-lg bg-white shadow-sm relative">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-sm text-gray-500 font-mono">#{task.id}</span>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${STATUS_STYLE[task.status]}`}
          onClick={handleChangeStatus}
        >
          {STATUS_LABEL[task.status]}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 break-words">{task.title}</h3>
      <p className="text-sm text-gray-600 break-words line-clamp-3">{task.content}</p>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="absolute bg-red-500 px-1 rounded-sm bottom-2 right-4 text-white hover:text-white cursor-pointer">
        delete
      </button>
    </li>
  );
};

export default TaskItem;
