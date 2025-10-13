import { CreateUserUseCase } from '../create-user.usecase';
import { IUserRepository } from '../../../domain/user.repository';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };
    useCase = new CreateUserUseCase(userRepo);
  });

  it('should create a user successfully', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.create.mockResolvedValue({ id: '1', email: 'test@mail.com', name: 'Jefer' } as any);
    const result = await useCase.execute({ email: 'test@mail.com', name: 'Jefer' });
    expect(userRepo.findByEmail).toHaveBeenCalledWith('test@mail.com');
    expect(userRepo.create).toHaveBeenCalledWith({ email: 'test@mail.com', name: 'Jefer' });
    expect(result.email).toBe('test@mail.com');
  });

  it('should throw if email already exists', async () => {
    userRepo.findByEmail.mockResolvedValue({ id: '1', email: 'test@mail.com' } as any);
    await expect(useCase.execute({ email: 'test@mail.com', name: 'Jefer' })).rejects.toThrow('Email already in use');
  });
});
