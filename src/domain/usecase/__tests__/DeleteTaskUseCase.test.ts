import { describe, it, beforeEach, expect} from '@jest/globals';
import { DeleteTaskUseCase } from '../DeleteTaskUseCase';
import { FakeTaskRepository } from '../../../../__mocks__/FakeTaskRepository';

describe('DeleteTaskUseCase', () => {
    let repo : FakeTaskRepository;
    let useCase : DeleteTaskUseCase;

    beforeEach(() => {
        repo = new FakeTaskRepository();
        useCase = new DeleteTaskUseCase(repo);

    });

    it('remove tarefa pelo id', async () => {
        repo.seed([
      { id: '1', title: 'A', description: '', isCompleted: false, createdAt: 1 },
      { id: '2', title: 'B', description: '', isCompleted: false, createdAt: 2 },
    ]);

        await useCase.execute('1');
        const remaining = await repo.getAllTasks();

        expect(remaining).toHaveLength(1);
        expect(remaining[0].id).toBe('2');
    });

    it('nao lança erro ao tentar excluir id inexistente', async() => {
        await expect(useCase.execute('inexistente')).resolves.not.toThrow();
    })

});