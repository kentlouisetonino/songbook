import { SetMetadata, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const PUBLIC_KEY = 'public';

export const Public = () => {
  return SetMetadata(PUBLIC_KEY, true);
};

export const byPassAuth = (
  context: ExecutionContext,
  reflector: Reflector,
): boolean => {
  return reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
};
