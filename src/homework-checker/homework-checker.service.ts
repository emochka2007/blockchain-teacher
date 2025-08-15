import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAiService } from '../open_ai/open_ai.service';
import { createReviewHomeworkFile } from '../utils/helpers';

@Injectable()
export class HomeworkCheckerService {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly prismaService: PrismaService,
    private readonly openAiService: OpenAiService,
  ) {}

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async checkHomework() {
    const currentDeadline = new Date().toISOString();
    const { user_id, solution, task_id } =
      await this.prismaService.userHomework.findFirstOrThrow({
        where: {
          score: null,
          solution: {
            not: null,
          },
          deadline: {
            lt: currentDeadline,
          },
        },
      });
    const fullHomework = await this.prismaService.homework.findUniqueOrThrow({
      where: {
        id: task_id,
      },
      include: {
        lesson: {
          include: {
            subject: true,
          },
        },
      },
    });
    const { score, review_details } = await this.openAiService.checkHomework({
      lessonName: fullHomework.lesson.topic,
      homeworkName: fullHomework.name,
      subjectName: fullHomework.lesson.subject.name,
      // is that correct?
      solution: solution!,
    });
    this.logger.log(`Score ${score}`);

    await createReviewHomeworkFile(
      user_id,
      review_details,
      fullHomework.lesson.topic,
    );

    return this.prismaService.userHomework.update({
      data: {
        score,
      },
      where: {
        user_id_task_id: {
          task_id,
          user_id,
        },
      },
    });
  }
}
