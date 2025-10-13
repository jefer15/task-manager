import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../orm/task.entity';
import { ITaskRepository } from '../../domain/task.repository';
import { TaskStatus } from '../../domain/task.model';

@Injectable()
export class TypeOrmTaskRepository implements ITaskRepository {
  constructor(@InjectRepository(TaskEntity) private repo: Repository<TaskEntity>) {}

  create(data: Partial<TaskEntity>): Promise<TaskEntity> {
    return this.repo.save(this.repo.create(data));
  }

  findByUser(userId: string, status?: TaskStatus) {
    const qb = this.repo.createQueryBuilder('task')
      .where('task.userId = :userId', { userId })
      .andWhere('task.deletedAt IS NULL');
    if (status) qb.andWhere('task.status = :status', { status });
    return qb.getMany();
  }

  updateStatus(id: string, status: TaskStatus) {
    return this.repo.update(id, { status });
  }

  softDelete(id: string) {
    return this.repo.softDelete(id);
  }
}
