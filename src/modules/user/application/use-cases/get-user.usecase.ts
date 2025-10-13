import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';

@Injectable()
export class GetUserUseCase {
  constructor(@Inject('IUserRepository') private repo: IUserRepository) {}

  async execute(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
