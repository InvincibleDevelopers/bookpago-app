import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";

export interface axiosTypes<T> {
    path: string;
    header?: AxiosHeaders;
    body?: Objects<T>;
}


export interface Objects<T> {
    [key: string]: T;
}