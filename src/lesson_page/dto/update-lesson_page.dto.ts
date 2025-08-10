import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonPageDto } from './create-lesson_page.dto';

export class UpdateLessonPageDto extends PartialType(CreateLessonPageDto) {}
