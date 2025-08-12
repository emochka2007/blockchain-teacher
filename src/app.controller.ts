import { Controller, Get, Post } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Controller()
export class AppController {
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
