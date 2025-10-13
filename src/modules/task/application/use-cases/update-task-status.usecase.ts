import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task.repository';
import { TaskStatus } from '../../domain/task.model';

@Injectable()
export class UpdateTaskStatusUseCase {
  constructor(@Inject('ITaskRepository') private repo: ITaskRepository) {}

  async execute(id: string, status: TaskStatus) {
    const res = await this.repo.updateStatus(id, status);
    if (res.affected === 0) throw new NotFoundException('Task not found');
    return res;
  }
}
