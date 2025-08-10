import { Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PracticeService {
  constructor(private readonly prismaService: PrismaService) {}
  create({ lessonId, content, name }: CreatePracticeDto) {
    return this.prismaService.practices.create({
      data: {
        content,
        name,
        lesson: {
          connect: { id: lessonId },
        },
      },
      include: {
        lesson: true,
      },
    });
  }

  findAll() {
    return this.prismaService.practices.findMany({
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
}
