import { Controller, Query, Post, Get, UseInterceptors } from "@nestjs/common";

import { RequestContextInterceptor } from "../../../src";

import { AppRequestContext } from "./app.context";
import { CustomRequestContext } from "./custom.context";

@Controller()
export class AppController {
  @Post()
  set(@Query("data") data: string): AppRequestContext {
    const store = AppRequestContext.get<AppRequestContext>() as AppRequestContext;

    store.data = data;

    return store;
  }

  @Get()
  @UseInterceptors(RequestContextInterceptor(CustomRequestContext))
  get(): CustomRequestContext {
    return CustomRequestContext.get<CustomRequestContext>() as CustomRequestContext;
  }
}
