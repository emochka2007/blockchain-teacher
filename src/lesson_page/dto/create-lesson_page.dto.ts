import { IsString, IsUUID } from 'class-validator';

export class CreateLessonPageDto {
  @IsString()
  content: string;
  @IsUUID('4')
  lessonId: string;
}
