import { Module } from '@nestjs/common';
import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { PrometheusService } from './prometheus.service';
import { PrometheusController } from './prometheus.controller';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [PrometheusController],
  providers: [
    PrometheusService,
    makeCounterProvider({ name: 'metric_name', help: 'metric_help' }),
  ],
})
export class PromClientModule {}
