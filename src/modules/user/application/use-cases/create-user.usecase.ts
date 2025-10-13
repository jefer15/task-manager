import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('IUserRepository') private repo: IUserRepository) {}

  async execute(dto: CreateUserDto) {
    const exists = await this.repo.findByEmail(dto.email);
    if (exists) throw new ConflictException('Email already in use');
    return this.repo.create(dto);
  }
}
