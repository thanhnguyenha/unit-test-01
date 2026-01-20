/** Task status: open | doing | done */
export type TaskStatus = 'open' | 'doing' | 'done';

export interface Task {
  /** Numeric id, auto-increment from server */
  id: number;
  /** 1–500 characters */
  title: string;
  /** 1–5000 characters */
  content: string;
  status: TaskStatus;
}
