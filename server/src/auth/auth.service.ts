import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { LoginInput } from './dto/auth.input';
import { LoginOutput } from './dto/auth.output';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async authorizeToken(email: string, accessToken: string): Promise<any> {
    const userDb = await this.userService.getUserByEmail(email);

    return {
      accessToken: accessToken,
      currentUser: userDb
    };
  }

  async loginUser(payload: LoginInput): Promise<LoginOutput> {
    const user = await this.userService.getUserByEmail(payload.email);
    const decodedPassword: any = this.jwtService.decode(user.password);

    if (payload.password !== decodedPassword) {
      throw new UnauthorizedException('Please check your password.');
    }

    const tokenPayload = {
      id: user.id,
      email: payload.email
    };

    const signedToken = this.jwtService.sign(tokenPayload, {
      secret: `${this.configService.get('AUTH_JWT_SECRET')}`,
      expiresIn: '25200s'
    });

    if (user) {
      await this.userService.updateUser({
        id: user.id,
        accessToken: signedToken
      });
    }

    return {
      accessToken: signedToken
    };
  }
}
