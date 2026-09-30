import { GetTasksUseCase } from "@/domain/usecase/GetTaskUseCase";
import { FakeTaskRepository } from "../../../__mocks__/FakeTaskRepository";
import { createTaskStore } from "../TaskStore";
import { GetTaskByYdUseCase } from "@/domain/usecase/GetTaskByYdUseCase";
import { CreateTaskUseCase } from "@/domain/usecase/CreateTaskUseCase";
import { UpdateTaskUseCase } from "@/domain/usecase/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "@/domain/usecase/DeleteTaskUseCase";
import { ToggleTaskCompletionUseCase } from "@/domain/usecase/ToggleTaskCompletionUseCase";
import { describe, it, expect, jest} from '@jest/globals';



function buildStore(repository = new FakeTaskRepository()){
    return createTaskStore({
        getTasksUseCase: new GetTasksUseCase(repository),
        getTaskByIdUseCase: new GetTaskByYdUseCase(repository),
        createTaskUseCase: new CreateTaskUseCase(repository),
        updateTaskUseCase: new UpdateTaskUseCase(repository),
        deleteTaskUseCase: new DeleteTaskUseCase(repository),
        toggleTaskUseCase: new ToggleTaskCompletionUseCase(repository)
    });
};
 
describe('taskStore(MVVM)', () => {
        it('loadTasks popula a lista e desliga o loading', async () => {
            const repo = new FakeTaskRepository();
            repo.seed([{ id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 }]);
            const store = buildStore(repo);

            await store.getState().loadTasks();

            const state = store.getState()

            expect(state.tasks).toHaveLength(1);
            expect(state.isLoading).toBe(false);
        });

        it('createTask adiciona a tareaf e recarrega a lista', async () => {
            const store = buildStore();

            await store.getState().createTask('Nova Tarefa', '');

            const state = store.getState();

            expect(state.tasks).toHaveLength(1);
            expect(state.tasks[0].title).toBe('Nova Tarefa');
        });

        it('createTask com o titulo vazio nao adiciona tarefa', async () => {
            const useStore = buildStore();

            await expect(useStore.getState().createTask('', '')).rejects.toThrow();
            expect(useStore.getState().tasks).toHaveLength(0);
        });
        
        it('updateTask atualiza a tarefa existente', async () => {
            const repo = new FakeTaskRepository();
            repo.seed([{ id: '1', title: 'Antigo', description: '', isCompleted: false, createdAt: 1 }]);
            const store = buildStore(repo);

            await store.getState().loadTasks();

            await store.getState().updateTask('1', 'Novo', 'Desc Nova');

            expect(store.getState().tasks[0].title).toBe('Novo');
            expect(store.getState().tasks[0].description).toBe('Desc Nova');

        });

        it('deleteTask remove a tarefa da lista', async () => {
            const repo = new FakeTaskRepository();
            repo.seed([{ id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 }]);
            const useStore = buildStore(repo);
            
            await useStore.getState().loadTasks();

            await useStore.getState().deleteTask('1');

            expect(useStore.getState().tasks).toHaveLength(0)
        });

        it('toggleTaskCompletion alterna o status de conclusao', async () => {
            const repo = new FakeTaskRepository();
            repo.seed([{ id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 }]);
            const useStore = buildStore(repo);
            await useStore.getState().loadTasks();

            await useStore.getState().toggleTaskCompletion('1');

            expect(useStore.getState().tasks[0].isCompleted).toBe(true);

        });

        it('loadTaskDetails define selectedTask corretamente', async () => {
            const repo = new FakeTaskRepository();
            repo.seed([{ id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 }]);
            const useStore = buildStore(repo);

            await useStore.getState().loadTaskDetails('1');

            expect(useStore.getState().selectedTask?.title).toBe('A')


        });

        it('loadTasks define error quando o repositório falha', async () => {
            const repository = new FakeTaskRepository();
            jest.spyOn(repository, 'getAllTasks').mockRejectedValueOnce(new Error('Falha ao acessar o banco'));
            const useStore = buildStore(repository);

            await useStore.getState().loadTasks();

            expect(useStore.getState().error).toBe('Falha ao acessar o banco');
            expect(useStore.getState().isLoading).toBe(false);
        });

        it('updateTask define error e relança a exceção quando o título é vazio', async () => {
            const repository = new FakeTaskRepository();
            repository.seed([{ id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 }]);
            const useStore = buildStore(repository);
            await useStore.getState().loadTasks();

            await expect(useStore.getState().updateTask('1', '', 'desc')).rejects.toThrow();
            expect(useStore.getState().error).toBeTruthy();
        });

    });