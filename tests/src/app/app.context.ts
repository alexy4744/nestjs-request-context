import { RequestContext } from "../../../src";

export class AppRequestContext extends RequestContext<AppRequestContext>() {
  data?: string;
}
