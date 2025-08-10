import { Injectable } from '@nestjs/common';
import { CreateLessonPageDto } from './dto/create-lesson_page.dto';
import { UpdateLessonPageDto } from './dto/update-lesson_page.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonPageService {
  constructor(private readonly prismaService: PrismaService) {}
  create({ content, lessonId }: CreateLessonPageDto) {
    return this.prismaService.lesson_pages.create({
      data: {
        content,
        lesson: {
          connect: {
            id: lessonId,
          },
        },
      },
      include: {
        lesson: true,
      },
    });
  }

  findAll() {
    return this.prismaService.lesson_pages.findMany({
      include: {
        lesson: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonPage`;
  }

  update(id: number, updateLessonPageDto: UpdateLessonPageDto) {
    return `This action updates a #${id} lessonPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonPage`;
  }
}
