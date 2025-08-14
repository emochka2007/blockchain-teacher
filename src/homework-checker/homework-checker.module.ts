import { Module } from '@nestjs/common';
import { HomeworkCheckerService } from './homework-checker.service';
import { OpenAiModule } from '../open_ai/open_ai.module';
import { HomeworkCheckerController } from './homework-checker.controller';

@Module({
  imports: [OpenAiModule],
  providers: [HomeworkCheckerService],
  controllers: [HomeworkCheckerController],
})
export class HomeworkCheckerModule {}
