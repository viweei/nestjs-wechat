"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeChatException = void 0;
class WeChatException extends Error {
    constructor(res) {
        super();
        this.res = res;
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
exports.WeChatException = WeChatException;
