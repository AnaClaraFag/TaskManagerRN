import {describe, expect, it, beforeEach} from '@jest/globals'
import { UpdateTaskUseCase } from '../UpdateTaskUseCase'
import { FakeTaskRepository } from '../../../../__mocks__/FakeTaskRepository'

describe('UpdateTaskUseCase', () =>{
    let repo: FakeTaskRepository;
    let useCase: UpdateTaskUseCase;

    beforeEach(() => {
        repo = new FakeTaskRepository();
        useCase = new UpdateTaskUseCase(repo);
    });

    it('atualiza título e descriçao da tarefa', async () => {
        repo.seed([{id: '1', title: 'Antigo', description: 'Desc antiga', isCompleted: false, createdAt: 1}]);
        await useCase.execute('1', 'Novo titulo', 'Nova desc');
        const task = await repo.getTaskById('1')

        expect(task?.title).toBe('Novo titulo')
        expect(task?.description).toBe('Nova desc')
    });

    it('lança erro quando o titulo é vazio', async () => {
        repo.seed([{id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1}]);

        await expect(useCase.execute('1', '', 'desc')).rejects.toThrow();

    });
})