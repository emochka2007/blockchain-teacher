import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ],
    });
    // @ts-ignore
    this.$on('query', (e: any) => {
      console.log('--------------------------------');
      console.log('Query:', e.query);
      console.log('Params:', e.params);
      console.log('Duration:', `${e.duration}ms`);
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
