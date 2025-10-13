import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task.repository';
import { TaskStatus } from '../../domain/task.model';

@Injectable()
export class ListTasksUseCase {
  constructor(@Inject('ITaskRepository') private repo: ITaskRepository) {}

  async execute(filter: { userId: string; status?: TaskStatus }) {
    return this.repo.findByUser(filter.userId, filter.status);
  }
}
