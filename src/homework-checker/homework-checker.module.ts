import { Module } from '@nestjs/common';
import { HomeworkCheckerService } from './homework-checker.service';

@Module({
  imports: [],
  providers: [HomeworkCheckerService],
})
export class HomeworkCheckerModule {}
