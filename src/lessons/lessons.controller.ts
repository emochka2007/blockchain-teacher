import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import {
  CreateLessonDto,
  FinishLessonDto,
  InitLessonsDto,
  StartLessonDto,
} from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('create')
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Post('start')
  start(@Body() createLessonDto: StartLessonDto) {
    return this.lessonsService.startNextLesson(createLessonDto);
  }

  @Get('current')
  getLessonForUser(
    @Query('subjectId') subjectId: string,
    @Query('userId') userId: string,
  ) {
    return this.lessonsService.findLessonForUser(subjectId, userId);
  }

  @Get('all')
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }

  @Post('init')
  initializeLessons(@Body() initLessonDto: InitLessonsDto) {
    return this.lessonsService.initializeLessons(initLessonDto);
  }

  @Post('finish')
  finishLesson(@Body() dto: FinishLessonDto) {
    return this.lessonsService.finishLesson(dto);
  }
}
