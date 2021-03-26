import { RequestContext } from "../request-context.base";

export interface RequestContextModuleOptions<T extends RequestContext> {
  context: new () => T;
}
