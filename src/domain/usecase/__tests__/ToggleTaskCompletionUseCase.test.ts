import { it, describe, beforeEach, expect } from '@jest/globals';
import { ToggleTaskCompletionUseCase } from '../ToggleTaskCompletionUseCase';
import { FakeTaskRepository } from '../../../../__mocks__/FakeTaskRepository';

describe('ToggleTaskCompletionUseCase', () => {
    let repo: FakeTaskRepository;
    let useCase : ToggleTaskCompletionUseCase;

    beforeEach(() =>{
        repo = new FakeTaskRepository();
        useCase = new ToggleTaskCompletionUseCase(repo);
    });

    it('marca uma tarefa pendente como concluida', async () => {
       repo.seed([{ id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 }])

       await useCase.execute('1');
       const task = await repo.getTaskById('1');

        expect(task?.isCompleted).toBe(true);
    });

    it('marca uma tarefa concluida de volta como pendente', async () => {
        repo.seed([{ id: '1', title: 'A', description: '', isCompleted: true, createdAt: 1 }])

        await useCase.execute('1');
        const task = await repo.getTaskById('1');



        expect(task?.isCompleted).toBe(false);
    });
});