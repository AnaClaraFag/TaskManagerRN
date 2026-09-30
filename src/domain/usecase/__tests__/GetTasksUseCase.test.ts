import { it, beforeEach, describe, expect } from '@jest/globals';
import { GetTasksUseCase } from '../GetTaskUseCase';
import { FakeTaskRepository } from '../../../../__mocks__/FakeTaskRepository';
import { GetTaskByYdUseCase } from '../GetTaskByYdUseCase';


describe('GetTasksUseCase', () =>{
    let repo: FakeTaskRepository;
    let useCase: GetTasksUseCase;

    beforeEach(() => {
        repo = new FakeTaskRepository();
        useCase = new GetTasksUseCase(repo);
    });

    it('retorna lista vazia quando nao há tarefas', async () => {
        expect(await useCase.execute()).toEqual([]);
    });

    it('retorna todas as tarefas cadastradas', async () => {
        repo.seed([
        { id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 },
        { id: '2', title: 'B', description: '', isCompleted: false, createdAt: 2 },
        ]);

        expect(await useCase.execute()).toHaveLength(2);

    });

});

describe('GetTaskByIdUseCase', () => {
     let repo: FakeTaskRepository;
    let useCase: GetTaskByYdUseCase;

    beforeEach(() => {
        repo = new FakeTaskRepository();
        useCase = new GetTaskByYdUseCase(repo);
    });

    it('retorna a tarefa correta pelo id', async () =>{
        repo.seed([{ id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 }]);
 
        const task = await useCase.execute('1');
        expect(task?.title).toBe('A')
    });

    it('retorna null quand o id nao existe', async () => {
        expect(await useCase.execute('inexistente')).toBeNull();
    });

});