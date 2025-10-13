import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './infrastructure/orm/task.entity';
import { TaskController } from './presentation/task.controller';
import { TypeOrmTaskRepository } from './infrastructure/repositories/task.repository.impl';
import { CreateTaskUseCase } from './application/use-cases/create-task.usecase';
import { ListTasksUseCase } from './application/use-cases/list-tasks.usecase';
import { UpdateTaskStatusUseCase } from './application/use-cases/update-task-status.usecase';
import { SoftDeleteTaskUseCase } from './application/use-cases/soft-delete-task.usecase';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), UserModule],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    ListTasksUseCase,
    UpdateTaskStatusUseCase,
    SoftDeleteTaskUseCase,
    { provide: 'ITaskRepository', useClass: TypeOrmTaskRepository },
  ],
})
export class TaskModule {}
