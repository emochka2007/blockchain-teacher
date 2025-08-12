import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSolutionDto } from './solution.dto';

@Injectable()
export class SolutionService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ homeworkId, owner }: CreateSolutionDto) {
    return this.prismaService.solutions.create({
      data: {
        homework_id: homeworkId,
        owner,
      },
    });
  }
}
