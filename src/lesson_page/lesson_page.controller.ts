import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonPageService } from './lesson_page.service';
import { CreateLessonPageDto } from './dto/create-lesson_page.dto';
import { UpdateLessonPageDto } from './dto/update-lesson_page.dto';

@Controller('lesson-page')
export class LessonPageController {
  constructor(private readonly lessonPageService: LessonPageService) {}

  @Post()
  create(@Body() createLessonPageDto: CreateLessonPageDto) {
    return this.lessonPageService.create(createLessonPageDto);
  }

  @Get()
  findAll() {
    return this.lessonPageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonPageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonPageDto: UpdateLessonPageDto) {
    return this.lessonPageService.update(+id, updateLessonPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonPageService.remove(+id);
  }
}
