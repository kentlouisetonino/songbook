import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class HealthCheckService {
  async healthCheck(res: Response) {
    return res.send({ message: 'Server is Online.' });
  }
}
