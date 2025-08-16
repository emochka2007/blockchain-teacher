import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { OpenAiModule } from '../open_ai/open_ai.module';
import { HomeworkModule } from '../homework/homework.module';
import { PracticeModule } from '../practice/practice.module';

@Module({
  imports: [OpenAiModule, HomeworkModule, PracticeModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
