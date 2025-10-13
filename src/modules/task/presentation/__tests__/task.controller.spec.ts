import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.usecase';
import { ListTasksUseCase } from '../../application/use-cases/list-tasks.usecase';
import { UpdateTaskStatusUseCase } from '../../application/use-cases/update-task-status.usecase';
import { SoftDeleteTaskUseCase } from '../../application/use-cases/soft-delete-task.usecase';
import { TaskStatus } from '../../domain/task.model';

describe('TaskController', () => {
  let controller: TaskController;
  let createTask: jest.Mocked<CreateTaskUseCase>;
  let listTasks: jest.Mocked<ListTasksUseCase>;
  let updateStatus: jest.Mocked<UpdateTaskStatusUseCase>;
  let deleteTask: jest.Mocked<SoftDeleteTaskUseCase>;

  beforeEach(async () => {
    createTask = { execute: jest.fn() } as any;
    listTasks = { execute: jest.fn() } as any;
    updateStatus = { execute: jest.fn() } as any;
    deleteTask = { execute: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        { provide: CreateTaskUseCase, useValue: createTask },
        { provide: ListTasksUseCase, useValue: listTasks },
        { provide: UpdateTaskStatusUseCase, useValue: updateStatus },
        { provide: SoftDeleteTaskUseCase, useValue: deleteTask },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should create a task', async () => {
    createTask.execute.mockResolvedValue({
      id: 't1',
      title: 'Test',
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      user: { id: '1', name: 'Jefer' },
    } as any);

    const result = await controller.create({ title: 'Test', userId: '1' } as any);

    expect(createTask.execute).toHaveBeenCalledWith({ title: 'Test', userId: '1' });
    expect(result.id).toBe('t1');
  });

  it('should list tasks by user', async () => {
    listTasks.execute.mockResolvedValue([
      { id: 't1', title: 'Task 1', status: TaskStatus.PENDING } as any,
      { id: 't2', title: 'Task 2', status: TaskStatus.DONE } as any,
    ]);

    const result = await controller.findByUser('1');
    expect(listTasks.execute).toHaveBeenCalledWith({ userId: '1', status: undefined });
    expect(result).toHaveLength(2);
  });

  it('should update task status', async () => {
    updateStatus.execute.mockResolvedValue({ affected: 1 });
    const result = await controller.update('t1', { status: 'DONE' } as any);
    expect(updateStatus.execute).toHaveBeenCalledWith('t1', 'DONE');
    expect(result).toEqual({ affected: 1 });
  });

  it('should delete a task', async () => {
    deleteTask.execute.mockResolvedValue({ affected: 1 });
    const result = await controller.remove('t1');
    expect(deleteTask.execute).toHaveBeenCalledWith('t1');
    expect(result).toEqual({ affected: 1 });
  });
});
