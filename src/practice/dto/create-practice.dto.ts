import { IsString, IsUUID } from 'class-validator';

export class CreatePracticeDto {
  @IsString()
  name: string;
  @IsUUID('4')
  lessonId: string;
}
