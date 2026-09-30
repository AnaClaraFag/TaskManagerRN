import { TaskRepository } from "@/data/repository/TaskRepository";
import { Task } from "../src/data/model/Task";

export class FakeTaskRepository implements TaskRepository{
    private tasks: Task[] = [];

    async getAllTasks(): Promise<Task[]> {
        return [...this.tasks].sort((a,b) => b.createdAt - a.createdAt);
    }

    async getTaskById(id: string): Promise<Task | null> {
        return this.tasks.find((t) => t.id === id) ?? null;
    }

    async createTask(task: Task): Promise<void> {
        this.tasks.push(task);
    }

    async updateTask(id: string, title: string, description: string): Promise<void> {
        this.tasks = this.tasks.map((t) =>
        t.id === id ? {...t, title, description } : t
        );
    }

    async deleteTask(id: string): Promise<void> {
        this.tasks = this.tasks.filter((t) => t.id !==id);
    }

    async toggleCompleted(id: string): Promise<void> {
        this.tasks = this.tasks.map((t) => 
        t.id === id ? {...t, isCompleted: !t.isCompleted }: t
        );
    }

    seed(tasks: Task[]){
        this.tasks = tasks
    }
}