import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectService } from './subject/subject.service';
import { SubjectModule } from './subject/subject.module';
import { PrismaModule } from './prisma/prisma.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonPageModule } from './lesson_page/lesson_page.module';
import { PracticeModule } from './practice/practice.module';
import { HomeworkModule } from './homework/homework.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SubjectModule,
    PrismaModule,
    LessonsModule,
    LessonPageModule,
    PracticeModule,
    HomeworkModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, SubjectService],
})
export class AppModule {}
