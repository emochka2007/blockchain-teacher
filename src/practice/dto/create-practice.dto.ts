import { IsString, IsUUID } from 'class-validator';

export class CreatePracticeDto {
  @IsString()
  name: string;
  @IsUUID('4')
  lessonId: string;
}

export class ReviewPracticeDto {
  @IsUUID('4')
  lessonId: string;
  @IsUUID('4')
  userId: string;
}
