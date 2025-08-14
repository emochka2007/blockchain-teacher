import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private readonly prismaService: PrismaService) {}
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
