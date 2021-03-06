import { CallHandler, ExecutionContext, NestInterceptor, Type, mixin } from "@nestjs/common";

import { Observable } from "rxjs";

import { RequestContext } from "./request-context.base";

export const RequestContextInterceptor = (
  store: ReturnType<typeof RequestContext>
): Type<NestInterceptor> => {
  class RequestContextMixinInterceptor implements NestInterceptor {
    intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
      store.enter();

      return next.handle();
    }
  }

  return mixin(RequestContextMixinInterceptor);
};
