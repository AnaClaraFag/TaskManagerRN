
import { create } from 'zustand';
import { CreateTaskUseCase } from "@/core/domain/usecase/CreateTaskUseCase";
import { DeleteTaskUseCase } from "@/core/domain/usecase/DeleteTaskUseCase";
import { GetTaskByYdUseCase } from "@/core/domain/usecase/GetTaskByYdUseCase";
import { GetTasksUseCase } from "@/core/domain/usecase/GetTaskUseCase";
import { ToggleTaskCompletionUseCase } from "@/core/domain/usecase/ToggleTaskCompletionUseCase";
import { UpdateTaskUseCase } from "@/core/domain/usecase/UpdateTaskUseCase";
import { initialTaskUiState, TaskUiState } from "@/presentation/TaskUiState";

interface TaskStore extends TaskUiState {
    loadTasks: () => Promise<void>;
    loadTaskDetails: (taskId: string) => Promise<void>;
    createTask: (title: string, description: string) => Promise<void>;
    updateTask: (id: string, title: string, description: string) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    toggleTaskCompletion: (id: string) => Promise<void>;
}

interface Dependencies {
    getTasksUseCase: GetTasksUseCase,
    getTaskByIdUseCase: GetTaskByYdUseCase,
    createTaskUseCase: CreateTaskUseCase,
    updateTaskUseCase: UpdateTaskUseCase,
    deleteTaskUseCase: DeleteTaskUseCase,
    toggleTaskUseCase: ToggleTaskCompletionUseCase
}

export function createTaskStore(deps: Dependencies) {
  return create<TaskStore>((set, get) => ({
    ...initialTaskUiState,

    loadTasks: async () => {
      set({ isLoading: true, error: null });
      try {
        const tasks = await deps.getTasksUseCase.execute();
        set({ tasks, isLoading: false });
      } catch (e) {
        set({ error: (e as Error).message, isLoading: false });
      }
    },

    loadTaskDetails: async (id: string) => {
      set({ isLoading: true });
      const task = await deps.getTaskByIdUseCase.execute(id);
      set({ selectedTask: task, isLoading: false });
    },

    createTask: async (title, description) => {
      try {
        await deps.createTaskUseCase.execute(title, description);
        await get().loadTasks();
      } catch (e) {
        set({ error: (e as Error).message });
        throw e;
      }
    },

    updateTask: async (id, title, description) => {
      try {
        await deps.updateTaskUseCase.execute(id, title, description);
        await get().loadTasks();
      } catch (e) {
        set({ error: (e as Error).message });
        throw e;
      }
    },

    deleteTask: async (id) => {
      await deps.deleteTaskUseCase.execute(id);
      await get().loadTasks();
    },

    toggleTaskCompletion: async (id) => {
      await deps.toggleTaskUseCase.execute(id);
      await get().loadTasks();
    },
  }));
}
