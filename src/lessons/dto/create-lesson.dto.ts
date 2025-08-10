import { IsArray, IsString, IsUUID } from 'class-validator';
import { CreatePracticeDto } from '../../practice/dto/create-practice.dto';
import { CreateHomeworkDto } from '../../homework/dto/create-homework.dto';

export class CreateLessonDto {
  @IsString()
  topic: string;
  @IsUUID('4')
  subjectId: string;
  @IsArray()
  practices: CreatePracticeDto[];
  @IsArray()
  homeworks: CreateHomeworkDto[];
}
