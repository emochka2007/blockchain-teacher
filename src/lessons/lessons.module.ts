import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { OpenAiModule } from '../open_ai/open_ai.module';

@Module({
  imports: [OpenAiModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
