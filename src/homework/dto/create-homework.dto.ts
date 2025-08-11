import { IsString, IsUUID } from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  name: string;
  @IsUUID('4')
  lessonId: string;
}
