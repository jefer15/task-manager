import { CreateTaskUseCase } from '../create-task.usecase';
import { ITaskRepository } from '../../../domain/task.repository';
import { IUserRepository } from '../../../../user/domain/user.repository';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let taskRepo: jest.Mocked<ITaskRepository>;
  let userRepo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    taskRepo = {
      create: jest.fn(),
      findByUser: jest.fn(),
      updateStatus: jest.fn(),
      softDelete: jest.fn(),
    };
    userRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };
    useCase = new CreateTaskUseCase(taskRepo, userRepo);
  });

  it('should create a task for existing user', async () => {
    userRepo.findById.mockResolvedValue({ id: '1', name: 'Jefer' } as any);
    taskRepo.create.mockResolvedValue({ id: 't1', title: 'Test Task' } as any);
    const dto = { title: 'Test Task', userId: '1' };
    const result = await useCase.execute(dto);
    expect(userRepo.findById).toHaveBeenCalledWith('1');
    expect(taskRepo.create).toHaveBeenCalled();
    expect(result.id).toBe('t1');
  });

  it('should throw if user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(useCase.execute({ title: 'Task', userId: '99' })).rejects.toThrow('User not found');
  });
});
