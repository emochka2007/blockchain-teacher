import { Injectable } from '@nestjs/common';
import {
  CreateHomeworkDto,
  SubmitHomeworkDto,
} from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomeworkService {
  constructor(private readonly prismaService: PrismaService) {}
  create({ name, lessonId }: CreateHomeworkDto) {
    return this.prismaService.homeworks.create({
      data: {
        name,
        lesson: {
          connect: { id: lessonId },
        },
      },
      include: { lesson: true },
    });
  }

  findAll() {
    return this.prismaService.homeworks.findMany({
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

  async submit({ user_id, homework_id, deadline }: SubmitHomeworkDto) {
    if (!deadline) {
      deadline = new Date().toISOString();
    }
    return this.prismaService.users_homework.create({
      data: {
        user_id,
        homework_id,
        deadline,
      },
    });
  }
}
