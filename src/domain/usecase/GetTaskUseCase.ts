import { TaskRepository } from '@/data/repository/TaskRepository';
import { Task } from '../../data/model/Task';

export class GetTasksUseCase {
    constructor(private repository: TaskRepository) {}
    async execute(): Promise<Task[]> {
        return this.repository.getAllTasks();
    }
}