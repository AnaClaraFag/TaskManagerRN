import { Task } from '../model/Task';
import { TaskRepository } from './TaskRepository';
import { getDatabaseInstance } from '../database/database';


export class SqliteTaskRepository implements TaskRepository {
  async getTaskById(id: string): Promise<Task | null> {
    const db = await getDatabaseInstance();
    const row = await db.getFirstAsync<any>('SELECT * FROM tasks WHERE id = ?', [id]);
    return row ? this.mapRow(row) : null;
  }

  async getAllTasks(): Promise<Task[]> {
    const db = await getDatabaseInstance();
    const rows = await db.getAllAsync<any>('SELECT * FROM tasks ORDER BY createdAt DESC');
    return rows.map(this.mapRow);
  }

  async createTask(task: Task): Promise<void> {
    const db = await getDatabaseInstance()
    await db.runAsync(
        'INSERT INTO tasks (id, title, description, isCompleted, createdAt) VALUES (?, ?, ?, ?, ?)',
      [task.id, task.title, task.description, task.isCompleted ? 1 : 0, task.createdAt]
    )
  }

  async updateTask(id: string, title: string, description: string): Promise<void> {
    const db = await getDatabaseInstance()
    await db.runAsync('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id]);
  }

  async deleteTask(id: string): Promise<void> {
    const db = await getDatabaseInstance()
    await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
  }

  async toggleCompleted(id: string): Promise<void> {
    const db = await getDatabaseInstance()
    await db.runAsync('UPDATE tasks SET isCompleted = NOT isCompleted WHERE id = ?', [id]);
  }

  private mapRow(row: any): Task {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      isCompleted: !!row.isCompleted,
      createdAt: row.createdAt,
    };
  }
}