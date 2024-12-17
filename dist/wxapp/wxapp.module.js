"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WxAppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WxAppModule = void 0;
const common_1 = require("@nestjs/common");
const wxapp_declare_1 = require("./wxapp.declare");
const wxapp_service_1 = require("./wxapp.service");
/**
 * @publicApi
 */
let WxAppModule = WxAppModule_1 = class WxAppModule {
    static forRoot(options) {
        return {
            global: !!options?.isGlobal,
            module: WxAppModule_1,
            providers: [{
                    provide: wxapp_declare_1.MODULE_OPTIONS_TOKEN,
                    useFactory: async () => ({
                        AppId: options?.AppId ?? process.env.WX_MINI_PROGRAM_APPID,
                        Secret: options?.Secret ?? process.env.WX_MINI_PROGRAM_SECRET,
                    }),
                }, wxapp_service_1.WxAppService],
            exports: [wxapp_declare_1.MODULE_OPTIONS_TOKEN, wxapp_service_1.WxAppService],
        };
    }
};
exports.WxAppModule = WxAppModule;
exports.WxAppModule = WxAppModule = WxAppModule_1 = __decorate([
    (0, common_1.Module)({})
], WxAppModule);
