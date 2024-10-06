import {DOMAIN} from '@env';
import axios, {AxiosError} from 'axios';

const fetcher = axios.create({
  baseURL: `${DOMAIN}`,
});

fetcher.interceptors.request.use(
  request => {
    const fullUrl = `${request.baseURL || ''}${request.url}`;
    console.log(
      'Axios interceptors request: ',
      request.method?.toUpperCase(),
      fullUrl,
    );
    return request;
  },
  error => Promise.reject(error),
);

// https://axios-http.com/kr/docs/interceptors
fetcher.interceptors.response.use(
  response => {
    // 응답이 성공적인 경우 그대로 반환
    return response;
  },
  error => {
    if (error instanceof AxiosError) {
      console.error('Axios interceptors error: ', error.response?.data);
    }

    const errorData = error.response?.data;
    const hasErrorKey = 'error' in errorData;
    if (!hasErrorKey) {
      // 네트워크 에러인 경우
      return Promise.reject({error: 'network error'});
    }
    // 그 서버에서 내려온 에러는 그대로 반환
    return Promise.reject(errorData);
  },
);

export default fetcher;
