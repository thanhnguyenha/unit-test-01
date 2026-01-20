import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import TaskManage from './TaskManage';

vi.mock('@/service/tasks', () => ({
  getTasks: vi.fn().mockResolvedValue([]),
  createTask: vi.fn().mockResolvedValue({
    id: 1,
    title: 'Task mới 1',
    content: 'Chưa có nội dung',
    status: 'open',
  }),
}));

describe('TaskManage', () => {
  it('displays "hiện không có task nào" when there are no tasks', async () => {
    render(React.createElement(TaskManage));
    expect(await screen.findByText('hiện không có task nào')).toBeInTheDocument();
  });

  it('renders keyword input (ô nhập từ khóa)', async () => {
    render(React.createElement(TaskManage));
    await waitFor(() => expect(screen.queryByText('Đang tải...')).not.toBeInTheDocument());
    const input = screen.getByPlaceholderText(/từ khóa/i);
    expect(input).toBeInTheDocument();
  });

  it('renders search button (nút tìm kiếm)', async () => {
    render(React.createElement(TaskManage));
    await waitFor(() => expect(screen.queryByText('Đang tải...')).not.toBeInTheDocument());
    const searchButton = screen.getByRole('button', { name: /tìm kiếm/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('renders add task button (nút thêm task)', async () => {
    render(React.createElement(TaskManage));
    await waitFor(() => expect(screen.queryByText('Đang tải...')).not.toBeInTheDocument());
    const addButton = screen.getByRole('button', { name: /thêm task/i });
    expect(addButton).toBeInTheDocument();
  });

  it('renders task list (danh sách task)', async () => {
    render(React.createElement(TaskManage));
    const list = await screen.findByRole('list');
    expect(list).toBeInTheDocument();
  });
});
