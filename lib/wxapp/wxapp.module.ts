import { DynamicModule, Module, OnApplicationBootstrap } from '@nestjs/common';

import { WxAppModuleOptions, } from '../types';
import { MODULE_OPTIONS_TOKEN } from './wxapp.declare';
import { WxAppService } from './wxapp.service';


/**
 * @publicApi
 */
@Module({})
export class WxAppModule {
  static forRoot(options?: WxAppModuleOptions): DynamicModule {
    return {
      global: !!options?.isGlobal,
      module: WxAppModule,
      providers: [{
        provide: MODULE_OPTIONS_TOKEN,
        useFactory: async () => ({
          AppId: options?.AppId ?? process.env.WX_MINI_PROGRAM_APPID,
          Secret: options?.Secret ?? process.env.WX_MINI_PROGRAM_SECRET,
        }),
      }, WxAppService],
      exports: [MODULE_OPTIONS_TOKEN, WxAppService],
    };
  }
}
