import { Controller, Post } from '@nestjs/common';
import { HomeworkCheckerService } from './homework-checker.service';

@Controller('homework-checker')
export class HomeworkCheckerController {
  constructor(
    private readonly homeworkCheckerService: HomeworkCheckerService,
  ) {}

  @Post('force-check')
  forceCheck() {
    return this.homeworkCheckerService.checkHomework();
  }
}
