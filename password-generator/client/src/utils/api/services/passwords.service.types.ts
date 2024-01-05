import {ApiRequestFnResponse} from "../api.types.ts";

export interface GeneratePasswordArgs {
    symbols: string;
    length: number;
    count: number;
}

export type GeneratePasswordResponse = ApiRequestFnResponse<string[]>;
