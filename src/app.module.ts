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
import { FlowModule } from './flow/flow.module';
import { HomeworkCheckerModule } from './homework-checker/homework-checker.module';
import * as process from 'node:process';
import { ScheduleModule } from '@nestjs/schedule';

const IS_PROD = process.env.PROD;
const prodModules = [PromClientModule];

@Module({
  imports: [
    //module for testing
    FlowModule,
    SubjectModule,
    PrismaModule,
    LessonsModule,
    PracticeModule,
    HomeworkModule,
    UserModule,
    DocsModule,
    ...(IS_PROD ? prodModules : []),
    FlowModule,
    HomeworkCheckerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
