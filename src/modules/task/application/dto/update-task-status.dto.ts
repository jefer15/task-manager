import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../domain/task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
