"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WxAppService = void 0;
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
const wxapp_declare_1 = require("./wxapp.declare");
const exception_1 = require("../exception");
/**
 * @publicApi
 */
let WxAppService = class WxAppService {
    constructor(options) {
        this.options = options;
        this.client = axios_1.default.create({
            baseURL: 'https://api.weixin.qq.com',
            timeout: 1000,
        });
    }
    async getAccessToken() {
        const { AppId, Secret } = this.options;
        const { data } = await this.client.get(`/cgi-bin/token`, {
            params: {
                grant_type: 'client_credential',
                appid: this.options.AppId,
                secret: this.options.Secret
            }
        });
        if (data.errcode)
            throw new exception_1.WeChatException(data);
        return data;
    }
    async login(code) {
        const { data } = await this.client.get('/sns/jscode2session', {
            params: {
                appid: this.options.AppId,
                secret: this.options.Secret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        });
        if (data.errcode)
            throw new exception_1.WeChatException(data);
        return data;
    }
};
exports.WxAppService = WxAppService;
exports.WxAppService = WxAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(wxapp_declare_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], WxAppService);
