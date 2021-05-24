# NestJS Request Context

Keep track of request-level data in NestJS using AsyncLocalStorage

## Prerequisites
 - [Node.js](https://nodejs.org/en/) >= 15.9.0 (to be changed once async_hooks becomes stable in Node.js v16)

## Installation

```bash
$ npm install @quicksend/nestjs-request-context
```

## Usage

### RequestContext

First, create a class that extends `RequestContext`. This class will hold your request-level data.

```ts
import { RequestContext as BaseRequestContext } from "@quicksend/nestjs-request-context";

export class RequestContext extends BaseRequestContext {
  data?: string;
}
```

### RequestContextMiddleware

Next, register the `RequestContextModule` in your application and use the middleware:

```ts
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { RequestContextModule, RequestContextMiddleware } from "@quicksend/nestjs-request-context";

import { RequestContext } from "./request.context";

@Module({
  imports: [
    RequestContextModule.forRoot({
      context: RequestContext
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware()).forRoutes({
      method: RequestMethod.ALL,
      path: "*"
    });
  }
}
```

You can now access the request context from anywhere in your application.

```ts
import { Controller, Get } from "@nestjs/common";

import { RequestContext } from "./request.context";

@Controller()
export class AppController {
  @Get()
  get(): RequestContext {
    const store = RequestContext.get<RequestContext>();

    store.data = "test";

    return store;
  }
}
```

## Tests

Run tests using the following commands:
```bash
$ npm run test
$ npm run test:watch
```
