'use client';

import { useState, useEffect } from 'react';

const TITLE_MAX = 500;
const CONTENT_MAX = 5000;

export interface AddTaskFormData {
  title: string;
  content: string;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddTaskFormData) => void;
  saving?: boolean;
}

const AddTaskModal = ({ isOpen, onClose, onSave, saving = false }: AddTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    globalThis.addEventListener('keydown', handleEscape);
    return () => globalThis.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const t = title.trim();
    const c = content.trim();
    if (t.length < 1) {
      setFormError('Tiêu đề phải có ít nhất 1 ký tự.');
      return;
    }
    if (t.length > TITLE_MAX) {
      setFormError(`Tiêu đề tối đa ${TITLE_MAX} ký tự.`);
      return;
    }
    if (c.length < 1) {
      setFormError('Nội dung phải có ít nhất 1 ký tự.');
      return;
    }
    if (c.length > CONTENT_MAX) {
      setFormError(`Nội dung tối đa ${CONTENT_MAX} ký tự.`);
      return;
    }
    onSave({ title: t, content: c });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-task-title"
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-task-title" className="mb-4 text-lg font-semibold text-gray-900">
          Thêm task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="add-task-title-input" className="mb-1 block text-sm font-medium text-gray-700">
              Tiêu đề
            </label>
            <input
              id="add-task-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề (1–500 ký tự)"
              maxLength={TITLE_MAX + 1}
              disabled={saving}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              autoFocus={false}
              autoComplete='off'
            />
          </div>
          <div>
            <label htmlFor="add-task-content-input" className="mb-1 block text-sm font-medium text-gray-700">
              Nội dung
            </label>
            <textarea
              id="add-task-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung (1–5000 ký tự)"
              maxLength={CONTENT_MAX + 1}
              rows={4}
              disabled={saving}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-y"
              autoFocus={false}
              autoComplete='off'
            />
          </div>
          {formError && (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
