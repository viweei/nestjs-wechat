export type WeChatErrorType = {
    errcode?: number;
    errmsg?: string;
};
export declare class WeChatException extends Error {
    private readonly res;
    constructor(res: WeChatErrorType);
    get code(): number | undefined;
    get message(): string;
    toString(): string;
}
