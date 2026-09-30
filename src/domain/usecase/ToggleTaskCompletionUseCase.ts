import { TaskRepository } from "@/data/repository/TaskRepository";

export class ToggleTaskCompletionUseCase {
    constructor(private repository: TaskRepository) {}

    async execute(id: string): Promise<void> {
        await this.repository.toggleCompleted(id);
    }   
}