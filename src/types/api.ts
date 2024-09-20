import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";

export interface axiosTypes {
    path: string;
    header?: AxiosHeaders;
    body?: Objects;
}


export interface Objects {
    [key: string]: string;
}