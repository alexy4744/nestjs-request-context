import { Controller, Post, Query } from "@nestjs/common";

import { AppRequestContext } from "./app.context";

@Controller()
export class AppController {
  @Post()
  set(@Query("data") data: string): AppRequestContext | undefined {
    const store = AppRequestContext.getStore();

    if (store) {
      store.data = data;
    }

    return store;
  }
}
