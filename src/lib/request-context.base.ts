import { AsyncLocalStorage } from "async_hooks";

export abstract class RequestContext {
  protected static readonly als = new AsyncLocalStorage<RequestContext>();

  static enter<T extends RequestContext>(constructor: new () => T): void {
    return RequestContext.als.enterWith(new constructor());
  }

  static get<T extends RequestContext>(): T {
    const store = RequestContext.als.getStore() as T | undefined;

    if (!store) {
      throw new Error("request context must be entered before retrieving the store");
    }

    return store;
  }
}
