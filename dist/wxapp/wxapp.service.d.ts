import { WxAppModuleOptions } from '../types';
/**
 * @publicApi
 */
export declare class WxAppService {
    private readonly options;
    private readonly baseUrl;
    constructor(options: WxAppModuleOptions);
    getAccessToken(): Promise<{
        access_token: string;
        expires_in: number;
    }>;
    login(code: string): Promise<{
        session_key: string;
        openid: string;
    }>;
}
