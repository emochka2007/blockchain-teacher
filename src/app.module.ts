import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectModule } from './subject/subject.module';
import { PrismaModule } from './prisma/prisma.module';
import { LessonsModule } from './lessons/lessons.module';
import { PracticeModule } from './practice/practice.module';
import { HomeworkModule } from './homework/homework.module';
import { UserModule } from './user/user.module';
import { DocsModule } from './docs/docs.module';
import { PromClientModule } from './prom-client/prom-client.module';
import { SolutionModule } from './solution/solution.module';
import * as process from 'node:process';

const IS_PROD = process.env.PROD;
const prodModules = [PromClientModule];

@Module({
  imports: [
    SubjectModule,
    PrismaModule,
    LessonsModule,
    PracticeModule,
    HomeworkModule,
    UserModule,
    DocsModule,
    SolutionModule,
    ...(IS_PROD ? prodModules : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
