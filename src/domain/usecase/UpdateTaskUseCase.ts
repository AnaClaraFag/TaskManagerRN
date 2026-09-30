import { TaskRepository } from "@/data/repository/TaskRepository";


export class UpdateTaskUseCase {
    constructor(private repository: TaskRepository) {}

    async execute(id: string, title: string, description: string): Promise<void> {
        if (!title.trim()) {
            throw new Error('O título da tarefa não pode ser vazio');
        }
        await this.repository.updateTask(id, title, description);
    }
}