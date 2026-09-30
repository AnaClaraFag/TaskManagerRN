import { beforeEach, describe, expect, it } from "@jest/globals";
import { CreateTaskUseCase } from "../CreateTaskUseCase";
import { FakeTaskRepository } from "../../../../__mocks__/FakeTaskRepository";

describe('CreateTaskUseCase', () => {
  let repository: FakeTaskRepository;
  let useCase: CreateTaskUseCase;

  beforeEach(() => {
    repository = new FakeTaskRepository();
    useCase = new CreateTaskUseCase(repository);
  });

  it('cria uma tarefa com título e descrição válidos', async () => {
    await useCase.execute('comprar leite', 'ir ao mercado');
    const tasks = await repository.getAllTasks();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('comprar leite');
    expect(tasks[0].description).toBe('ir ao mercado');
    expect(tasks[0].isCompleted).toBe(false);
  });

  it('lançar erro quando o título é vazio', async () => {
    await expect(useCase.execute('', 'desc')).rejects.toThrow(
       'O título da tarefa não pode ser vazio'
    );
  });

  it('lança erro quando o titulo é só espacos em branco', async () => {
    await expect(useCase.execute('   ', 'desc')).rejects.toThrow();
  });

  it('remove espaços em branco nas pontas dos títulos', async () => {
    await useCase.execute(' Estudar ', '');
    const tasks = await repository.getAllTasks();
    
    expect(tasks[0].title).toBe('Estudar')
    });
});
