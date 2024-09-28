import {AxiosHeaders, RawAxiosRequestHeaders} from 'axios';

export interface axiosTypes<T> {
  path: string;
  header?: Record<string, string>;
  body?: Objects<T>;
}

export interface Objects<T> {
  [key: string]: T;
}
