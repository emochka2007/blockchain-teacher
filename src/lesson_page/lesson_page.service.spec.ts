import { Test, TestingModule } from '@nestjs/testing';
import { LessonPageService } from './lesson_page.service';

describe('LessonPageService', () => {
  let service: LessonPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonPageService],
    }).compile();

    service = module.get<LessonPageService>(LessonPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
