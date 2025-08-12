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
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { PromClientModule } from './prom-client/prom-client.module';

@Module({
  imports: [
    SubjectModule,
    PrismaModule,
    LessonsModule,
    PracticeModule,
    HomeworkModule,
    UserModule,
    DocsModule,
    PromClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
