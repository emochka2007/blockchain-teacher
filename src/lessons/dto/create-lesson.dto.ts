import { IsString, IsUUID } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  topic: string;
  @IsUUID('4')
  subjectId: string;
}
