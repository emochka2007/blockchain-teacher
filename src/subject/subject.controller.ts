import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, StartSubjectDto } from './subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('create')
  createSubject(@Body() dto: CreateSubjectDto) {
    return this.subjectService.createSubject(dto);
  }

  @Get('all')
  getAllSubjects() {
    return this.subjectService.getSubjects();
  }

  @Post('start')
  startLesson(@Body() dto: StartSubjectDto) {
    return this.subjectService.startSubject(dto);
  }
}
