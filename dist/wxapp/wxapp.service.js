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
const node_fetch_1 = __importDefault(require("node-fetch"));
const common_1 = require("@nestjs/common");
const exception_1 = require("../exception");
const wxapp_declare_1 = require("./wxapp.declare");
/**
 * @publicApi
 */
let WxAppService = class WxAppService {
    constructor(options) {
        this.options = options;
        this.baseUrl = 'https://api.weixin.qq.com/';
    }
    async getAccessToken() {
        const { AppId, Secret } = this.options;
        const params = Object.fromEntries(Object.entries({
            'grant_type': 'client_credential',
            'appid': AppId,
            'secret': Secret
        }).filter(([_, value]) => value !== undefined && value !== null));
        const url = new URL('cgi-bin/token', this.baseUrl);
        url.search = new URLSearchParams(params).toString();
        const { status, data } = await (0, node_fetch_1.default)(url).then(async (response) => {
            return {
                status: response.status,
                data: await response.json()
            };
        });
        if (data.errcode)
            throw new exception_1.WeChatException(data);
        return { access_token: data.access_token, expires_in: data.expires_in };
    }
    async login(code) {
        const url = new URL('sns/jscode2session', this.baseUrl);
        const params = Object.fromEntries(Object.entries({
            appid: this.options.AppId,
            secret: this.options.Secret,
            js_code: code,
            grant_type: 'authorization_code'
        }).filter(([_, value]) => value !== undefined && value !== null));
        url.search = new URLSearchParams(params).toString();
        const { status, data } = await (0, node_fetch_1.default)(url).then(async (response) => {
            return {
                status: response.status,
                data: await response.json()
            };
        });
        return { session_key: '', openid: '' };
    }
};
exports.WxAppService = WxAppService;
exports.WxAppService = WxAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(wxapp_declare_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], WxAppService);
