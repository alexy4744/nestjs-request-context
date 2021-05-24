import { Inject, Injectable, NestMiddleware, Type, mixin } from "@nestjs/common";

import { RequestContext } from "./request-context.base";
import { RequestContextModuleOptions } from "./request-context.interfaces";

import { REQUEST_CONTEXT_MODULE_OPTIONS } from "./request-context.constants";

export const RequestContextMiddleware = <T extends RequestContext>(
  context?: new () => T
): Type<NestMiddleware> => {
  @Injectable()
  class RequestContextMixinMiddleware implements NestMiddleware {
    constructor(
      @Inject(REQUEST_CONTEXT_MODULE_OPTIONS)
      private readonly options: RequestContextModuleOptions<T>
    ) {}

    use(_req: unknown, _res: unknown, next: () => void): void {
      RequestContext.enter(context || this.options.context);

      next();
    }
  }

  return mixin(RequestContextMixinMiddleware);
};
