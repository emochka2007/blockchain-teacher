import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  name: string;
  @IsUUID('4')
  lessonId: string;
}

export class SubmitHomeworkDto {
  @IsUUID('4')
  userId: string;
  @IsUUID('4')
  homeworkId: string;
}

export class StartHomeworkDto {
  @IsUUID('4')
  userId: string;
  @IsUUID('4')
  homeworkId: string;
  @IsOptional()
  @IsDate()
  deadline?: string;
}
