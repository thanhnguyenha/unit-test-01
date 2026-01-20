import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest';
import AddTaskModal, { AddTaskFormData } from './AddTaskModal';
import React from 'react';

describe.skip('-- AddTaskModal', () => {
  it('check UI', async () => {
    render(
      <AddTaskModal
        isOpen={true}
        onClose={() => {}}
        onSave={(data: AddTaskFormData) => { console.log(data); }}
        saving={false}
      />
    );
    expect(screen.getByText('Thêm task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập tiêu đề (1–500 ký tự)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập nội dung (1–5000 ký tự)')).toBeInTheDocument();
    expect(screen.getByText('Lưu')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('check title required', async () => {
    const user = userEvent.setup();
    render(
      <AddTaskModal
        isOpen={true}
        onClose={() => {}}
        onSave={(data: AddTaskFormData) => { console.log(data); }}
        saving={false}
      />
    );
    await user.click(screen.getByText('Lưu'));
    const error = await screen.findByText('Tiêu đề phải có ít nhất 1 ký tự.');
    expect(error).toBeInTheDocument();
  });

  it('check content required', async () => {
    const user = userEvent.setup();
    render(
      <AddTaskModal
        isOpen={true}
        onClose={() => {}}
        onSave={(data: AddTaskFormData) => { console.log(data); }}
        saving={false}
      />
    );
    await user.type(screen.getByRole('textbox', { name: 'Tiêu đề' }), 'quet nha');
    await user.click(screen.getByText('Lưu'));
    const error = await screen.findByText('Nội dung phải có ít nhất 1 ký tự.');
    expect(error).toBeInTheDocument();
  });
  it('check title max length', async () => {
    const user = userEvent.setup({delay: 0});
    render(
      <AddTaskModal
        isOpen={true}
        onClose={() => {}}
        onSave={(data: AddTaskFormData) => { console.log(data); }}
        saving={false}
      />
    );
    const titleInput = screen.getByRole('textbox', { name: 'Tiêu đề' });
    fireEvent.change(titleInput, { target: { value: 'a'.repeat(501) } });
    fireEvent.click(screen.getByText('Lưu'));
    const error = await screen.findByText('Tiêu đề tối đa 500 ký tự.');
    expect(error).toBeInTheDocument();
  });
});