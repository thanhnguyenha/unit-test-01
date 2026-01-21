import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import TaskManage from './TaskManage';

// vi.mock('@/service/tasks', () => ({
//   getTasks: vi.fn().mockResolvedValue([]),
//   createTask: vi.fn().mockResolvedValue({
//     id: 1,
//     title: 'Task mới 1',
//     content: 'Chưa có nội dung',
//     status: 'open',
//   }),
// }));

describe('TaskManage', () => {
  it.skip('displays "hiện không có task nào" when there are no tasks', async () => {
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

  it('thêm task thành công', async () => {
    const user = userEvent.setup();
    render(<TaskManage />);
    await waitFor(() => expect(screen.queryByText('Đang tải...')).not.toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /thêm task/i }));
    const titleInput = screen.getByPlaceholderText('Nhập tiêu đề (1–500 ký tự)');
    const contentInput = screen.getByPlaceholderText('Nhập nội dung (1–5000 ký tự)');
    await user.type(titleInput, 'test title');
    await user.type(contentInput, 'test content');
    await user.click(screen.getByText('Lưu'));
    await waitFor(() => expect(screen.queryByText('Lưu')).not.toBeInTheDocument());
    const itemTitle = await screen.findByText('test title');
    expect(itemTitle).toBeInTheDocument();
    const itemContent = await screen.findByText('test content');
    expect(itemContent).toBeInTheDocument();
  });
});
