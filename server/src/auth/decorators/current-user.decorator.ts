import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const LoggedUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
