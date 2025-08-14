import { Test, TestingModule } from '@nestjs/testing';
import { HomeworkCheckerService } from './homework-checker.service';

describe('HomeworkCheckerService', () => {
  let service: HomeworkCheckerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeworkCheckerService],
    }).compile();

    service = module.get<HomeworkCheckerService>(HomeworkCheckerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
