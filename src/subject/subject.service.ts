import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSubjectDto,
  CreateSubjectWithExistingLecturesDto,
} from './subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSubjects() {
    return this.prismaService.subjects.findMany();
  }

  async createSubjectWithLectures({
    name,
    lectures,
  }: CreateSubjectWithExistingLecturesDto) {
    return this.prismaService.$transaction(async (tx) => {
      const subject = await tx.subjects.create({
        data: {
          name,
        },
      });

      const updatedLectures = await tx.lessons.updateMany({
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

      return tx.subjects.findUnique({
        where: { id: subject.id },
        include: { lessons: true },
      });
    });
  }

  async createSubject({ name }: CreateSubjectDto) {
    return this.prismaService.subjects.create({
      data: {
        name,
      },
    });
  }
}
