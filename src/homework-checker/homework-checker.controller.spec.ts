import { Test, TestingModule } from '@nestjs/testing';
import { HomeworkCheckerController } from './homework-checker.controller';

describe('HomeworkCheckerController', () => {
  let controller: HomeworkCheckerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeworkCheckerController],
    }).compile();

    controller = module.get<HomeworkCheckerController>(HomeworkCheckerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
