import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../application/use-cases/get-user.usecase';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private createUser: CreateUserUseCase,
    private getUser: GetUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  create(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  findOne(@Param('id') id: string) {
    return this.getUser.execute(id);
  }
}
