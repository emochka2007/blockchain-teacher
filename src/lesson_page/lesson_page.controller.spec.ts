import { Test, TestingModule } from '@nestjs/testing';
import { LessonPageController } from './lesson_page.controller';
import { LessonPageService } from './lesson_page.service';

describe('LessonPageController', () => {
  let controller: LessonPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonPageController],
      providers: [LessonPageService],
    }).compile();

    controller = module.get<LessonPageController>(LessonPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
