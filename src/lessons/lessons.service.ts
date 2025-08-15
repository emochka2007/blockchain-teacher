import { Injectable } from '@nestjs/common';
import {
  CreateLessonDto,
  InitLessonsDto,
  StartLessonDto,
} from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';
import { createLessonFiles, createStartPracticeFile } from '../utils/helpers';
import { PRECALCULUS } from './lesson.consts';
import { OpenAiService } from '../open_ai/open_ai.service';
import { HomeworkService } from '../homework/homework.service';
import { PracticeService } from '../practice/practice.service';

@Injectable()
export class LessonsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly openAiService: OpenAiService,
    private readonly homeworkService: HomeworkService,
    private readonly practiceService: PracticeService,
  ) {}

  create({ topic, subjectId }: CreateLessonDto) {
    return this.prismaService.lesson.create({
      data: {
        topic,
        subject: {
          connect: {
            id: subjectId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.lesson.findMany({});
  }

  async startLesson({ userId, lessonName }: StartLessonDto) {
    await createStartPracticeFile(userId, lessonName);
    return `Lesson started. Practice file created`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }

  async initializeLessons({ subjectName }: InitLessonsDto) {
    const { name: subjName, id: subjectId } =
      await this.prismaService.subject.findUniqueOrThrow({
        where: {
          name: subjectName,
        },
      });

    for (let topic of PRECALCULUS) {
      topic = topic.toLowerCase();
      const lesson = await this.prismaService.lesson.findUnique({
        where: {
          topic,
        },
      });
      if (lesson) {
        continue;
      }

      // Lesson creation
      const lessonContent = await this.openAiService.getLessonContent(topic);
      const { id: lessonId } = await this.create({ topic, subjectId });
      await createLessonFiles('lesson', topic, lessonContent, subjName);
      // Practice
      const practiceContent =
        await this.openAiService.getPracticeContent(lessonContent);
      await createLessonFiles('practice', topic, practiceContent, subjName);
      await this.practiceService.create({
        lessonId,
        name: `${topic}-practice`,
      });
      // Homework
      const homeworkContent = await this.openAiService.getHomeworkContent(
        lessonContent,
        practiceContent,
      );
      await createLessonFiles('homework', topic, homeworkContent, subjName);
    }
  }
}
