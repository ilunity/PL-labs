import { AxiosResponse } from 'axios';

export type ApiRequestFnResponse<DataType> = Promise<AxiosResponse<DataType>>;
export type ApiRequestFn<DataType> = () => ApiRequestFnResponse<DataType>;

export interface IApiError {
  status: number;
  message: string;
}
