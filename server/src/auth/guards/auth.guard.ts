import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

import { byPassAuth } from '../decorators/public.decorator'

@Injectable()
export class AuthGuard extends AuthGuardPassport('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    if (byPassAuth(context, this.reflector)) return true
    return (await super.canActivate(context)) as boolean
  }
}
