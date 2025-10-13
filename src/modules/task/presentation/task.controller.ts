import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { CreateTaskDto } from '../application/dto/create-task.dto';
import { UpdateTaskStatusDto } from '../application/dto/update-task-status.dto';
import { CreateTaskUseCase } from '../application/use-cases/create-task.usecase';
import { ListTasksUseCase } from '../application/use-cases/list-tasks.usecase';
import { UpdateTaskStatusUseCase } from '../application/use-cases/update-task-status.usecase';
import { SoftDeleteTaskUseCase } from '../application/use-cases/soft-delete-task.usecase';
import { TaskStatus } from '../domain/task.model';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private createTask: CreateTaskUseCase,
    private listTasks: ListTasksUseCase,
    private updateStatus: UpdateTaskStatusUseCase,
    private deleteTask: SoftDeleteTaskUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task for a user' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  create(@Body() dto: CreateTaskDto) {
    return this.createTask.execute(dto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'List tasks by user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'status', enum: TaskStatus, required: false })
  @ApiResponse({ status: 200, description: 'List of tasks returned successfully.' })
  findByUser(@Param('userId') userId: string, @Query('status') status?: TaskStatus) {
    return this.listTasks.execute({ userId, status });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update task status' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: UpdateTaskStatusDto })
  @ApiResponse({ status: 200, description: 'Task status updated successfully.' })
  update(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    return this.updateStatus.execute(id, dto.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.deleteTask.execute(id);
  }
}
