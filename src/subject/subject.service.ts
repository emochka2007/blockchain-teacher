import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSubjectDto,
  CreateSubjectWithExistingLecturesDto,
} from './subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService) {}

  getSubjects() {
    return this.prismaService.subject.findMany({});
  }

  async createSubjectWithLectures({
    name,
    lectures,
  }: CreateSubjectWithExistingLecturesDto) {
    return this.prismaService.$transaction(async (tx) => {
      const subject = await tx.subject.create({
        data: {
          name,
        },
      });

      const updatedLectures = await tx.lesson.updateMany({
        where: {
          id: { in: lectures },
        },
        data: {
          subject_id: subject.id,
        },
      });

      if (updatedLectures.count !== lectures.length) {
        throw new BadRequestException('Some lecture IDs not found');
      }

      return tx.subject.findUnique({
        where: { id: subject.id },
        include: { lessons: true },
      });
    });
  }

  createSubject({ name }: CreateSubjectDto) {
    return this.prismaService.subject.create({
      data: {
        name,
      },
    });
  }
}
