import { Module } from '@nestjs/common';

import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './heath-check.service';

@Module({
  providers: [HealthCheckService],
  controllers: [HealthCheckController]
})
export class HealthCheckModule {}
