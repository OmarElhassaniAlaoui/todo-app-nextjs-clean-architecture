import { Todo } from '../core/entities/Todo';
import { TodoRepository } from '../core/repositories/TodoRepository';

export class LocalStorageTodoRepository implements TodoRepository {
  private readonly STORAGE_KEY = 'todos';

  async getAll(): Promise<Todo[]> {
    if (typeof window !== 'undefined') {
      const todosJson = localStorage.getItem(this.STORAGE_KEY);
      return todosJson ? JSON.parse(todosJson) : [];
    }
    return [];
  }

  async add(todo: Todo): Promise<void> {
    const todos = await this.getAll();
    todos.push(todo);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    }
  }

  async toggle(id: string): Promise<void> {
    const todos = await this.getAll();
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTodos));
    }
  }

  async delete(id: string): Promise<void> {
    const todos = await this.getAll();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTodos));
    }
  }
}