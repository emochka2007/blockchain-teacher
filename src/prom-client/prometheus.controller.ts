import { Controller, Post } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';

@Controller('prom')
export class PrometheusController {
  constructor(private readonly promService: PrometheusService) {}
  @Post('increment')
  increment() {
    this.promService.inc();
  }
}
