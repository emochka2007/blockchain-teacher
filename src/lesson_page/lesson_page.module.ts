import { Module } from '@nestjs/common';
import { LessonPageService } from './lesson_page.service';
import { LessonPageController } from './lesson_page.controller';

@Module({
  controllers: [LessonPageController],
  providers: [LessonPageService],
})
export class LessonPageModule {}
