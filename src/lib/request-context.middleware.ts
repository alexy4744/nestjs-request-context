import { Injectable, NestMiddleware, Type, mixin } from "@nestjs/common";

import { RequestContext } from "./request-context.base";

export const RequestContextMiddleware = (
  store: ReturnType<typeof RequestContext>
): Type<NestMiddleware> => {
  @Injectable()
  class RequestContextMixinMiddleware implements NestMiddleware {
    use(_req: unknown, _res: unknown, next: () => void): void {
      store.enter();

      next();
    }
  }

  return mixin(RequestContextMixinMiddleware);
};
