import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';

import { WxAppModuleOptions } from '../types';
import { MODULE_OPTIONS_TOKEN } from './wxapp.declare';
import { WeChatException } from '../exception';


/**
 * @publicApi
 */
@Injectable()
export class WxAppService {
  private readonly client = axios.create({
    baseURL: 'https://api.weixin.qq.com',
    timeout: 1000,
  });

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: WxAppModuleOptions
  ) { }


  async getAccessToken(): Promise<{ access_token: string, expires_in: number }> {
    const { AppId, Secret } = this.options;

    const { data } = await this.client.get(`/cgi-bin/token`, {
      params: {
        grant_type: 'client_credential',
        appid: this.options.AppId,
        secret: this.options.Secret
      }
    });

    if (data.errcode) throw new WeChatException(data);

    return data;
  }

  async login(code: string): Promise<{ session_key: string, openid: string }> {

    const { data } = await this.client.get('/sns/jscode2session', {
      params: {
        appid: this.options.AppId,
        secret: this.options.Secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    if (data.errcode) throw new WeChatException(data);

    return data;
  }


}