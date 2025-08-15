import { IsString, IsUUID } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  topic: string;
  @IsUUID('4')
  subjectId: string;
}

export class StartLessonDto {
  @IsUUID('4')
  userId: string;
  @IsString()
  lessonName: string;
}
export class InitLessonsDto {
  @IsString()
  subjectName: string;
}
