import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/user.repository';
import { UserEntity } from '../orm/user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {}

  create(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.repo.save(this.repo.create(data));
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { email } });
  }
}
