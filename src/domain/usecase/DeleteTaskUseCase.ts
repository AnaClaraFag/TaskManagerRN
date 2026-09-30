import { TaskRepository } from "@/data/repository/TaskRepository";

export class DeleteTaskUseCase {
    constructor(private repository: TaskRepository) {}

    async execute(id: string): Promise<void> {
        await this.repository.deleteTask(id);
    }
}