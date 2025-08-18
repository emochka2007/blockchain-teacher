import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

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
  @IsNotEmpty()
  name: string;
}

export class StartSubjectDto {
  @IsUUID('4')
  userId: string;
  @IsUUID('4')
  subjectId: string;
}
