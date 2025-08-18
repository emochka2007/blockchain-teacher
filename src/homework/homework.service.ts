import { Injectable } from '@nestjs/common';
import {
  CreateHomeworkDto,
  StartHomeworkDto,
  SubmitHomeworkDto,
} from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { PrismaService } from '../prisma/prisma.service';
import { createSolutionFile, readSolutionFromFile } from '../utils/helpers';

@Injectable()
export class HomeworkService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ path, lessonId }: CreateHomeworkDto) {
    return this.prismaService.homework.create({
      data: {
        path,
        lesson: {
          connect: { id: lessonId },
        },
      },
      include: { lesson: true },
    });
  }

  findAll() {
    return this.prismaService.homework.findMany({
      include: { lesson: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} homework`;
  }

  update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    return `This action updates a #${id} homework`;
  }

  remove(id: number) {
    return `This action removes a #${id} homework`;
  }

  async startHomework({ userId, homeworkId, deadline }: StartHomeworkDto) {
    const now = new Date();
    if (!deadline) {
      deadline = new Date(
        now.getTime() + 2 * 24 * 60 * 60 * 1000,
      ).toISOString();
    }
    await createSolutionFile(userId, homeworkId);
    return this.prismaService.userHomework.create({
      data: {
        deadline: deadline,
        user: {
          connect: { id: userId },
        },
        homework: {
          connect: { id: homeworkId },
        },
      },
    });
  }

  async submitSolution({ userId, homeworkId }: SubmitHomeworkDto) {
    const solution = await readSolutionFromFile(userId, homeworkId);
    return this.prismaService.userHomework.update({
      data: {
        solution,
      },
      where: {
        user_id_task_id: {
          user_id: userId,
          task_id: homeworkId,
        },
      },
    });
  }
}
