import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../modules/user/infrastructure/orm/user.entity';
import { TaskEntity } from '../modules/task/infrastructure/orm/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'task_manager',
  entities: [UserEntity, TaskEntity],
  synchronize: true,
};
