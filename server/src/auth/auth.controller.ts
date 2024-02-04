import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { LoginOutput } from './dto/auth.output';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  loginUser(@Req() req: Request): Promise<LoginOutput> {
    return this.authService.loginUser(req.body);
  }
}
