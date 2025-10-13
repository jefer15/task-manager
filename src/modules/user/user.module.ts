import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/user.controller';
import { UserEntity } from './infrastructure/orm/user.entity';
import { TypeOrmUserRepository } from './infrastructure/repositories/user.repository.impl';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    { provide: 'IUserRepository', useClass: TypeOrmUserRepository },
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
