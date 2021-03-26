import { APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppRequestContext } from "./app.context";

import { RequestContextModule, RequestContextInterceptor } from "../../../src";

@Module({
  imports: [
    RequestContextModule.register({
      context: AppRequestContext
    })
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor()
    }
  ]
})
export class AppModule {}
