/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateClassDto } from './dto/create-task.dto';
import { getTaskByFilterDto } from './dto/get-task-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
// import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  // private task: Task[] = [];
  // getAllTask(): Task[] {
  //   return this.task;
  // }
  // getTaskById(id: string): Task {
  //   const found= this.task.find((task) => task.id === id);;
  //   if(!found){
  //     throw new NotFoundException(`Task with id ${id} is not found`);
  //   }
  //   return found;
  // }
  // getTaskByFilter(filterDto: getTaskByFilterDto): Task[] {
  //   const { search, status } = filterDto;
  //   // console.log(status);
  //   //define tempory array
  //   let tasks = this.getAllTask();
  //   //with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status == status);
  //   }
  //   //with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   //return final result
  //   return tasks;
  // }
  // deleteTaskById(id: string): void {
  //   const found=this.getTaskById(id);
  //   this.task = this.task.filter((task) => task.id !== found.id);
  // }
  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // createTask(createClassDto: CreateClassDto): Task {
  //   const { title, description } = createClassDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.task.push(task);
  //   return task;
  // }

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createPost(post: CreateClassDto) {
    const { title, description } = post;
    console.log(title, description);
    console.log(await this.tasksRepository.find());
    const task = await this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    if (!task) {
      throw new NotFoundException(`Data Not Inserted`);
    }
    await this.tasksRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Task With id ${id} not found`);
    }
    return found;
  }

  async deleteById(id: string): Promise<void> {
    const data = await this.tasksRepository.delete(id);
    console.log(data);
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  // getTasks(filterDto:getTaskByFilterDto): Promise<Task[]>{
    
  // }

}
