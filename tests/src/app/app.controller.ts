import { Controller, Post, Query } from "@nestjs/common";

import { AppRequestContext } from "./app.context";

@Controller()
export class AppController {
  @Post()
  set(@Query("data") data: string): AppRequestContext {
    const store = AppRequestContext.get<AppRequestContext>() as AppRequestContext;

    store.data = data;

    return store;
  }
}
