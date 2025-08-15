import { Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import { OpenAiModule } from '../open_ai/open_ai.module';

@Module({
  imports: [OpenAiModule],
  controllers: [PracticeController],
  providers: [PracticeService],
})
export class PracticeModule {}
