import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('AUTH_JWT_SECRET')
    });
  }

  async validate(validationPayload: { email: string }): Promise<any> {
    const userDb = await this.userService.getUserByEmail(
      validationPayload.email
    );

    if (!userDb) {
      throw new UnauthorizedException(
        'Invalid token. No credential record associated in database. Please login again or create an account.'
      );
    }

    if (!userDb.accessToken) {
      throw new UnauthorizedException(
        'Invalid token. Access token does not exist in database. Please login.'
      );
    }

    return await this.authService.authorizeToken(
      validationPayload.email,
      userDb.accessToken
    );
  }
}
