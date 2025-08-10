import { ArrayNotEmpty, IsArray, IsString, IsUUID } from 'class-validator';

export class CreateSubjectWithExistingLecturesDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  lectures: string[];
}
export class CreateSubjectDto {
  @IsString()
  name: string;
}
