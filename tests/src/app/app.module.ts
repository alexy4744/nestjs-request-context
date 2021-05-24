import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppRequestContext } from "./app.context";

import { RequestContextModule, RequestContextMiddleware } from "../../../src";

@Module({
  imports: [
    RequestContextModule.forRoot({
      context: AppRequestContext
    })
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware()).forRoutes({
      method: RequestMethod.ALL,
      path: "*"
    });
  }
}
