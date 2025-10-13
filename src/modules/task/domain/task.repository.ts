import { TaskEntity } from "../infrastructure/orm/task.entity";
import { TaskStatus } from './task.model';
export interface ITaskRepository {
  create(data: Partial<TaskEntity>): Promise<TaskEntity>;
  findByUser(userId: string, status?: TaskStatus): Promise<TaskEntity[]>;
  updateStatus(id: string, status: TaskStatus): Promise<any>;
  softDelete(id: string): Promise<any>;
}
