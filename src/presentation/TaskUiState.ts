import { Task } from "../data/model/Task";

export interface TaskUiState {
   tasks: Task[];
   selectedTask: Task | null;
   isLoading: boolean;
   error: string | null;
}

export const initialTaskUiState: TaskUiState = {
   tasks: [],
   selectedTask: null,
   isLoading: false,
   error: null,
};