import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  name: string;
  @IsUUID('4')
  lessonId: string;
}

export class SubmitHomeworkDto {
  @IsUUID('4')
  user_id: string;
  @IsUUID('4')
  homework_id: string;
  @IsOptional()
  @IsDate()
  deadline?: string;
}
