import {AxiosResponse} from 'axios';

export type ApiRequestFnResponse<DataType> = Promise<AxiosResponse<DataType>>;
export type ApiRequestFn<DataType> = () => ApiRequestFnResponse<DataType>;

export interface IApiError {
    status: number;
    message: string;
}

/** --------------------------------------------- */

export interface INewsItem {
    title: string;
    content: string;
    url: string;
}

export enum NEWS_TYPES {
    WASHINGTON_POST = 'WP',
    NEW_YORK_TIMES = 'NYT',
    LOS_ANGELES_POST = 'LAP',
}

export type ParserNews = Record<`${NEWS_TYPES}`, INewsItem[]>;

export type ParserNewsResponse = ApiRequestFnResponse<ParserNews>;
