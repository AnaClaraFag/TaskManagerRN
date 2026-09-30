import { Task } from '../../data/model/Task';
import { TaskRepository } from '../../data/repository/TaskRepository';

export class GetTaskByYdUseCase {
    constructor(private repository: TaskRepository) {}
    async execute(taskId: string): Promise<Task | null> {
        return this.repository.getTaskById(taskId); 
    }
}