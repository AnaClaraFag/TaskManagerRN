import { createTaskStore } from "@/presentation/TaskStore";
import { GetTasksUseCase } from "../domain/usecase/GetTaskUseCase";
import { SqliteTaskRepository } from "../data/repository/SqliteTaskRepository";
import { GetTaskByYdUseCase } from "../domain/usecase/GetTaskByYdUseCase";
import { CreateTaskUseCase } from "../domain/usecase/CreateTaskUseCase";
import { UpdateTaskUseCase } from "../domain/usecase/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "../domain/usecase/DeleteTaskUseCase";
import { ToggleTaskCompletionUseCase } from "../domain/usecase/ToggleTaskCompletionUseCase";

const repo = new SqliteTaskRepository();

export const useTaskStore = createTaskStore({
    getTasksUseCase: new GetTasksUseCase(repo),
    getTaskByIdUseCase: new GetTaskByYdUseCase(repo),
    createTaskUseCase: new CreateTaskUseCase(repo),
    updateTaskUseCase: new UpdateTaskUseCase(repo),
    deleteTaskUseCase: new DeleteTaskUseCase(repo),
    toggleTaskUseCase: new ToggleTaskCompletionUseCase(repo)
})