import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class PrometheusService {
  constructor(@InjectMetric('metric_name') public counter: Counter<string>) {}

  inc() {
    this.counter.inc();
  }
}
