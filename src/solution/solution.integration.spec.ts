import { Test, TestingModule } from '@nestjs/testing';
import { SolutionService } from './solution.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  postgresClient,
  prismaService,
} from '../prisma/setup.integration.spec';

describe('SolutionService', () => {
  let service: SolutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    service = module.get<SolutionService>(SolutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a solution', async () => {
    // Start a transaction
    await postgresClient.query('BEGIN');

    try {
      // Perform the create operation
      const createResult = await service.create({ homeworkId: '', owner: '' });

      // Commit the transaction
      await postgresClient.query('COMMIT');

      // Query the database for the newly created car
      const result = await postgresClient.query('SELECT * FROM "public"."Car"');

      // Log the results
      console.log(result.rows);

      // Assert the create result
      expect(createResult).toEqual({
        id: 1,
        model: 'mercedes',
        color: 'red',
      });
    } catch (error) {
      // Rollback the transaction in case of an error
      await postgresClient.query('ROLLBACK');
      throw error;
    }
  });
});
