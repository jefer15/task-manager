import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task.repository';
import { IUserRepository } from '../../../user/domain/user.repository';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository') private taskRepo: ITaskRepository,
    @Inject('IUserRepository') private userRepo: IUserRepository,
  ) {}

  async execute(dto: CreateTaskDto) {
    const user = await this.userRepo.findById(dto.userId);
    if (!user) throw new NotFoundException('User not found');
    return this.taskRepo.create({
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      user: { id: dto.userId } as any,
    } as any);
  }
}
