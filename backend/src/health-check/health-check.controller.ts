import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

import { HealthCheckService } from './heath-check.service'

@Controller()
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  @Get('/')
  healtCheck(@Req() req: Request, @Res() res: Response) {
    return this.healthCheckService.healthCheck(res)
  }
}
