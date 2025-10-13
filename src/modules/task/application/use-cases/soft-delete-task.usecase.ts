import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task.repository';

@Injectable()
export class SoftDeleteTaskUseCase {
  constructor(@Inject('ITaskRepository') private repo: ITaskRepository) {}

  async execute(id: string) {
    const res = await this.repo.softDelete(id);
    if (res.affected === 0) throw new NotFoundException('Task not found');
    return res;
  }
}
