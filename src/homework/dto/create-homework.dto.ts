import { IsString, IsUUID } from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  name: string;
  @IsString()
  content: string;
  @IsUUID('4')
  lessonId: string;
}
