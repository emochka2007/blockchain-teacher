import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OpenAiService } from '../open_ai/open_ai.service';

@Injectable()
export class HomeworkCheckerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly openAiService: OpenAiService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkHomework() {
    const currentDeadline = new Date().toISOString();
    const userHomework = await this.prismaService.userHomework.findFirstOrThrow(
      {
        where: {
          score: null,
          solution: {
            not: null,
          },
          deadline: {
            gt: currentDeadline,
          },
        },
      },
    );
    const fullHomework = await this.prismaService.homework.findUniqueOrThrow({
      where: {
        id: userHomework.task_id,
      },
      include: {
        lesson: {
          include: {
            subject: true,
          },
        },
      },
    });
    return this.openAiService.checkHomework({
      lessonName: fullHomework.lesson.topic,
      homeworkName: fullHomework.name,
      subjectName: fullHomework.lesson.subject.name,
      // is that correct?
      solution: userHomework.solution!,
    });
  }

  review() {}
}
