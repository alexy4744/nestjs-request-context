import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppRequestContext } from "./app.context";

import { RequestContextMiddleware } from "../../../src";

@Module({
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware(AppRequestContext)).forRoutes({
      method: RequestMethod.POST,
      path: "/middleware"
    });
  }
}
