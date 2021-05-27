import { AsyncLocalStorage } from "async_hooks";

import { RequestContextNotEnteredException } from "./request-context.exceptions";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RequestContext = <Store>() => {
  return class RequestContextBase {
    static readonly als = new AsyncLocalStorage<Store>();

    static enter(this: new () => Store): void {
      return RequestContextBase.als.enterWith(new this());
    }

    static getItem<K extends keyof Store>(key: K): Store[K] {
      const store = this.als.getStore();

      if (!store) {
        throw new RequestContextNotEnteredException(store);
      }

      return store[key];
    }

    static getStore(): Store | undefined {
      return this.als.getStore();
    }
  };
};
