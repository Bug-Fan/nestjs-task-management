/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
// import { query } from 'express';
import { CreateClassDto } from './dto/create-task.dto';
import { getTaskByFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // // @Get()
  // // getAllTask(): Task[] {
  // //   return this.tasksService.getAllTask();
  // // }

  // @Get()
  // getTask(@Query() filterDto: getTaskByFilterDto): Task[] {
  //   ///If task link have filter than particular task is coming and task not have filter than all task is coming
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskByFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTask();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(@Body() createClassDto: CreateClassDto): Task {
  //   return this.tasksService.createTask(createClassDto);
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // @Patch('/:id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto:UpdateTaskDto,
  // ): Task {
  //   const {status}=updateTaskDto;
  //   return this.tasksService.updateTask(id, status);
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Promise<Task> {
  //   return this.tasksService.getTaskById(id);
  // }

  @Post()
  CreateTask(@Body() CreateClassDto: CreateClassDto): Promise<Task> {
    return this.tasksService.createPost(CreateClassDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteById(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { status } = updateTaskDto;
    return this.tasksService.updateTask(id, status);
  }

  // @Get()
  // getTask(@Query() filterDto: getTaskByFilterDto): Promise<Task[]> {
  //   ///If task link have filter than particular task is coming and task not have filter than all task is coming
  //   return this.tasksService.getTasks(filterDto);
  // }
}
