import { UserEntity } from "../infrastructure/orm/user.entity";
export interface IUserRepository {
  create(data: Partial<UserEntity>): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
