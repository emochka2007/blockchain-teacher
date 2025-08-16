import { Injectable } from '@nestjs/common';
import {
  CreatePracticeDto,
  ReviewPracticeDto,
} from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAiService } from '../open_ai/open_ai.service';
import { readFileContentAsync } from '../utils/helpers';

@Injectable()
export class PracticeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly openAiService: OpenAiService,
  ) {}
  create({ lessonId, path }: CreatePracticeDto) {
    return this.prismaService.practice.create({
      data: {
        path,
        lesson: {
          connect: { id: lessonId },
        },
      },
      include: {
        lesson: true,
      },
    });
  }

  async review({ lessonId, userId }: ReviewPracticeDto) {
    const practice = await this.prismaService.practice.findFirstOrThrow({
      where: {
        lesson_id: lessonId,
      },
      include: {
        lesson: {
          include: {
            subject: true,
          },
        },
      },
    });

    const solutionContent = await readFileContentAsync(
      this.practicePath(userId, practice.lesson.topic),
    );

    const practiceContent = await readFileContentAsync(practice.path);

    return this.openAiService.checkPractice({
      userId,
      lessonName: practice.lesson.topic,
      subjectName: practice.lesson.subject.name,
      solutionContent,
      practiceContent,
    });
  }

  findAll() {
    return this.prismaService.practice.findMany({
      include: {
        lesson: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} practice`;
  }

  update(id: number, updatePracticeDto: UpdatePracticeDto) {
    return `This action updates a #${id} practice`;
  }

  remove(id: number) {
    return `This action removes a #${id} practice`;
  }

  practicePath(userId: string, lessonName: string) {
    return `./public/docs/practices/${userId}/${lessonName}`;
  }
}
