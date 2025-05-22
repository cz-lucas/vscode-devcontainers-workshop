export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string | null;
  due_until: string | null;
}

export interface TodoCreate {
  title: string;
  completed: boolean;
  due_until?: string | null;
}