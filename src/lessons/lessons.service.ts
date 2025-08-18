import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  CreateLessonDto,
  FinishLessonDto,
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
import { LESSON_STATUS } from './lesson.interface';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class LessonsService {
  private readonly logger: Logger = new Logger();
  constructor(
    private readonly prismaService: PrismaService,
    private readonly openAiService: OpenAiService,
    private readonly homeworkService: HomeworkService,
    private readonly practiceService: PracticeService,
    private readonly subjectService: SubjectService,
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

  async findLessonForUser(subjectId: string, userId: string) {
    const lessonsInProgress = await this.prismaService.lessonProgress.findMany({
      where: {
        user_id: userId,
        progress: LESSON_STATUS.IN_PROGRESS,
      },
      include: {
        lesson: {
          include: {
            subject: true,
          },
        },
      },
    });

    const lessonWithSubject = lessonsInProgress.filter(
      (l) => l.lesson.subject.id === subjectId,
    );

    if (lessonWithSubject.length !== 1) {
      throw new InternalServerErrorException(
        `Found ${lessonWithSubject.length} lessons. Must be equal to 1. Error in application logic`,
      );
    }

    return lessonWithSubject[0];
  }

  findAll() {
    return this.prismaService.lesson.findMany({});
  }

  async finishLesson({ userId, lessonId }: FinishLessonDto) {
    return this.prismaService.lessonProgress.create({
      data: {
        user_id: userId,
        lesson_id: lessonId,
        progress: LESSON_STATUS.COMPLETED,
      },
    });
  }

  async startNextLesson({ userId, subjectId }: StartLessonDto) {
    if (
      !(await this.subjectService.checkIfSubjectStarted({ userId, subjectId }))
    ) {
      throw new BadRequestException(
        'Subject must be started before starting lesson',
      );
    }
    let orderNumberOfNewLesson = 0;
    const lastLesson = await this.prismaService.lessonProgress.findFirst({
      where: {
        user_id: userId,
        progress: LESSON_STATUS.COMPLETED,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        lesson: true,
      },
    });

    if (lastLesson) {
      orderNumberOfNewLesson = lastLesson.lesson.order_number + 1;
    }

    const nextLesson = await this.prismaService.lesson.findFirst({
      where: {
        order_number: orderNumberOfNewLesson,
      },
    });

    if (nextLesson == null) {
      throw new BadRequestException('This lesson is last');
    }

    await this.prismaService.lessonProgress.create({
      data: {
        user_id: userId,
        lesson_id: nextLesson.id,
        progress: LESSON_STATUS.IN_PROGRESS,
      },
    });

    await createStartPracticeFile(userId, nextLesson.topic);
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
      this.logger.log(`Processing topic - ${topic}`);
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
      this.logger.log(`Lesson created ${topic}`);
      // Practice
      const practiceContent =
        await this.openAiService.getPracticeContent(lessonContent);
      const practicePath = await createLessonFiles(
        'practice',
        topic,
        practiceContent,
        subjName,
      );
      await this.practiceService.create({
        lessonId,
        path: practicePath,
      });
      this.logger.log(`Practice created ${topic}`);
      // Homework
      const homeworkContent = await this.openAiService.getHomeworkContent(
        lessonContent,
        practiceContent,
      );
      const homeworkPath = await createLessonFiles(
        'homework',
        topic,
        homeworkContent,
        subjName,
      );
      await this.homeworkService.create({ path: homeworkPath, lessonId });
      this.logger.log(`Homework created ${topic}`);
    }
  }
}
