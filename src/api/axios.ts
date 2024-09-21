import {DOMAIN} from '@env';
import {axiosTypes} from '@src/types/api';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${DOMAIN}`,
});

// https://axios-http.com/kr/docs/interceptors
axiosInstance.interceptors.response.use(
  response => {
    // 응답이 성공적인 경우 그대로 반환
    return response;
  },
  error => {
    const hasErrorKey = 'error' in error;
    if (!hasErrorKey) {
      // 네트워크 에러인 경우
      return Promise.reject({error: 'network error'});
    }
    // 그 서버에서 내려온 에러는 그대로 반환
    return Promise.reject(error);
  },
);

const get = async ({path, header}: axiosTypes) => {
  const {data} = await axiosInstance.get(`${path}`, {
    headers: header,
  });

  return data;
};

const post = async ({path, header, body}: axiosTypes) => {
  const {data} = await axiosInstance.post(`${path}`, body, {
    headers: header,
  });

  return data;
};

export default axiosInstance;
export {get, post};
