import { DynamicModule, Module } from "@nestjs/common";

import { RequestContextModuleOptions } from "./request-context.interfaces";

import { REQUEST_CONTEXT_MODULE_OPTIONS } from "./request-context.constants";
import { RequestContext } from "./request-context.base";

@Module({
  exports: [REQUEST_CONTEXT_MODULE_OPTIONS]
})
export class RequestContextModule {
  static register<T extends RequestContext>(
    options: RequestContextModuleOptions<T>
  ): DynamicModule {
    return {
      module: RequestContextModule,
      providers: [
        {
          provide: REQUEST_CONTEXT_MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }
}
