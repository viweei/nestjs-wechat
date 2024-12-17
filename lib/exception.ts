
export type WeChatErrorType = {
  errcode?: number;
  errmsg?: string;
};

export class WeChatException extends Error {
  constructor(private readonly res: WeChatErrorType) {
    super();
  }

  get code() {
    return this.res.errcode;
  }

  get message() {
    return `${this.res.errmsg}`;
  }

  toString() {
    return `${this.res.errmsg}`;
  }
}