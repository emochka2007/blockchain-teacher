import { IsEnum, IsString } from 'class-validator';

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}
export class CreateUserDto {
  @IsString()
  username: string;
  @IsEnum(UserRole)
  role: UserRole;
}
