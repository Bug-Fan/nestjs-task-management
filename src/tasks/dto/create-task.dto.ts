/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
