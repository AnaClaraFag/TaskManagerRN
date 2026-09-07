import { TaskRepository } from '../../data/repository/TaskRepository';
import { Task } from '../../data/model/Task';
import * as Crypto from 'expo-crypto';

export class CreateTaskUseCase {
    constructor (private repository: TaskRepository) {}
    async execute(title: string, description: string): Promise<void> {
        if(!title.trim()){
            throw new Error('O título da tarefa não pode ser vazio');
        }
        const task: Task = {
            id: Crypto.randomUUID(),
            title: title, 
            description: description,
            isCompleted: false,
            createdAt: Date.now()
        };
        await this.repository.createTask(task);
    }
}