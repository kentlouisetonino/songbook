import { createParamDecorator } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common'

export const LoggedUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user
  },
)
