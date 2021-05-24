import { AsyncLocalStorage } from "async_hooks";

type Maybe<T> = T | undefined;

export abstract class RequestContext {
  protected static readonly als = new AsyncLocalStorage<RequestContext>();

  static enter<T extends RequestContext>(constructor: new () => T): void {
    return RequestContext.als.enterWith(new constructor());
  }

  static get<T extends RequestContext>(): Maybe<T> {
    return RequestContext.als.getStore() as Maybe<T>;
  }
}
