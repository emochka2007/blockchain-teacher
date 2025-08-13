import { IsString, IsUUID } from 'class-validator';

export class CreateSolutionDto {
  @IsUUID('4')
  owner: string;
  @IsUUID('4')
  homeworkId: string;
}
