// src/mocks/handlers.ts
import { Task } from '@/components/task-manage/task-type';
import { http, HttpResponse } from 'msw';

const JSON_SERVER_URL =
  process.env.NEXT_PUBLIC_JSON_SERVER_URL || 'http://localhost:3001';

const base: Task[] = [
  { id: 1, title: 'Học NextJS với MSW', content: 'Nội dung mock', status: 'open' },
];

export const handlers = [
  http.get(`${JSON_SERVER_URL}/tasks`, () => {
    return HttpResponse.json([...base]);
  }),
  http.post(`${JSON_SERVER_URL}/tasks`, async ({ request }) => {
    const body = (await request.json()) as { title?: string; content?: string; status?: string };
    const newId = base.length + 1;
    const task: Task = { id: newId, title: body.title ?? '', content: body.content ?? '', status: (body.status ?? 'open') as Task['status'] };
    base.push(task);
    return HttpResponse.json(task, { status: 201 });
  }),
  http.delete(`${JSON_SERVER_URL}/tasks/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.put(`${JSON_SERVER_URL}/tasks/:id`, async ({ request }) => {
    const body = (await request.json()) as { id: number; title: string; content: string; status: string };
    return HttpResponse.json(body);
  }),
];