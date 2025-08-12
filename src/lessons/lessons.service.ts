import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private readonly prismaService: PrismaService) {}
  create({ topic, practices, homeworks, subjectId }: CreateLessonDto) {
    return this.prismaService.lessons.create({
      data: {
        topic,
        practices: {
          create: practices.map((pr) => {
            return { name: pr.name };
          }),
        },
        homeworks: {
          create: homeworks.map((pr) => {
            return { name: pr.name };
          }),
        },
        subject: {
          connect: {
            id: subjectId,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all lessons`;
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
}
