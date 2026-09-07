import { Task } from '../model/Task';

export interface TaskRepository {
  getTaskById(id: string): Promise<Task | null>;
  getAllTasks(): Promise<Task[]>;
  createTask(task: Task): Promise<void>;
  updateTask(id: string, title: string, description: string): Promise<void>;
  deleteTask(id: string): Promise<void>;
  toggleCompleted(id: string): Promise<void>;

}