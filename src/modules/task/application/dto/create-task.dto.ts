import { IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsUUID()
  userId: string;
}
