'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Task, TaskStatus } from './task-type';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import { getTasks, createTask, deleteTask, updateTask } from '@/service/tasks';

const TaskManage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không thể tải danh sách task');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const kw = keyword.trim().toLowerCase();
  const filteredTasks = kw
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(kw) ||
          t.content.toLowerCase().includes(kw)
      )
    : tasks;

  const handleSaveFromModal = async (data: { title: string; content: string }) => {
    setAdding(true);
    setError(null);
    try {
      await createTask({ ...data, status: 'open' });
      await fetchTasks();
      setModalOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không thể thêm task');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không thể xóa task');
    }
  };

  const handleChangeStatus = async (id: number, status: TaskStatus) => {
    try {
      const task = tasks.find((t) => t.id === id);
      await updateTask(id, { ...task, status });
      await fetchTasks();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không thể cập nhật status');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      {/* Search: keyword input + search button */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập từ khóa"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Từ khóa tìm kiếm"
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Add task button */}
      <div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Thêm task
        </button>
      </div>

      {modalOpen && (
        <AddTaskModal
          isOpen
          onClose={() => setModalOpen(false)}
          onSave={handleSaveFromModal}
          saving={adding}
        />
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm" role="alert">
          {error}
        </p>
      )}

      {/* Task list */}
      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : (
        <ul className="list-none space-y-2 min-h-8">
          {filteredTasks.length === 0 ? (
            <li className="text-gray-500">hiện không có task nào</li>
          ) : (
            filteredTasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onDelete={handleDelete}
                onChangeStatus={handleChangeStatus}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default TaskManage;
