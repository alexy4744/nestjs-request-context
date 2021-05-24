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

### RequestContextModule
Next, register the `RequestContextModule` in your application with your context class:

```ts
import { Module } from "@nestjs/core";
import { RequestContextModule } from "@quicksend/nestjs-request-context";

import { RequestContext } from "./request.context";

@Module({
  imports: [
    RequestContextModule.register({
      context: RequestContext
    })
  ]
})
export class AppModule {}
```

### RequestContextInterceptor

Once `RequestContextModule` is registered, you can now use `RequestContextInterceptor` in your application to persist request-level data.

```ts
import { APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/core";

import { RequestContextModule, RequestContextInterceptor } from "@quicksend/nestjs-request-context";

import { RequestContext } from "./request.context";

@Module({
  imports: [
    RequestContextModule.register({
      context: RequestContext
    })
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor()
    }
  ]
})
export class AppModule {}
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

You can also override the request context class for a specific endpoint or endpoints by passing in a different context class to the interceptor.

```ts
import { Controller, Get, UseInterceptors } from "@nestjs/common";

import { RequestContextInterceptor } from "@quicksend/nestjs-request-context";

import { CustomRequestContext } from "./custom.context";

@Controller()
export class AppController {
  @Get()
  @UseInterceptors(RequestContextInterceptor(CustomRequestContext))
  get(): CustomRequestContext {
    return CustomRequestContext.get<CustomRequestContext>();
  }
}
```

## Tests

Run tests using the following commands:
```bash
$ npm run test
$ npm run test:watch
```
