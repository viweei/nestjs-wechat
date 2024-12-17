import { DynamicModule } from '@nestjs/common';
import { WxAppModuleOptions } from '../types';
/**
 * @publicApi
 */
export declare class WxAppModule {
    static forRoot(options?: WxAppModuleOptions): DynamicModule;
}
