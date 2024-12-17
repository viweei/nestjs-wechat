import fetch, { Response } from 'node-fetch';
import { Inject, Injectable } from '@nestjs/common';

import { WxAppModuleOptions } from '../types';
import { WeChatException } from '../exception';
import { MODULE_OPTIONS_TOKEN } from './wxapp.declare';

/**
 * @publicApi
 */
@Injectable()
export class WxAppService {
  private readonly baseUrl = 'https://api.weixin.qq.com/';

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: WxAppModuleOptions
  ) { }

  async getAccessToken(): Promise<{ access_token: string, expires_in: number }> {
    const { AppId, Secret } = this.options;
    const params: Record<string, any> = Object.fromEntries(
      Object.entries({
        'grant_type': 'client_credential',
        'appid': AppId,
        'secret': Secret
      }).filter(([_, value]) => value !== undefined && value !== null)
    );

    const url = new URL('cgi-bin/token', this.baseUrl);
    url.search = new URLSearchParams(params).toString();

    const { status, data } = await fetch(url).then(async (response: Response) => {
      return {
        status: response.status,
        data: await response.json() as Record<string, any>
      }
    });

    if (data.errcode) throw new WeChatException(data);
    return { access_token: data.access_token, expires_in: data.expires_in };
  }

  async login(code: string): Promise<{ session_key: string, openid: string }> {
    const url = new URL('sns/jscode2session', this.baseUrl);
    const params: Record<string, any> = Object.fromEntries(
      Object.entries({
        appid: this.options.AppId,
        secret: this.options.Secret,
        js_code: code,
        grant_type: 'authorization_code'
      }).filter(([_, value]) => value !== undefined && value !== null)
    );

    url.search = new URLSearchParams(params).toString();

    const { status, data } = await fetch(url).then(async (response: Response) => {
      return {
        status: response.status,
        data: await response.json() as Record<string, any>
      }
    });

    return { session_key: '', openid: '' };
  }
}