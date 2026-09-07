import { TaskRepository } from '@/core/data/repository/TaskRepository';
import { Task } from '../../data/model/Task';

export class GetTasksUseCase {
    constructor(private repository: TaskRepository) {}
    async execute(): Promise<Task[]> {
        return this.repository.getAllTasks();
    }
}