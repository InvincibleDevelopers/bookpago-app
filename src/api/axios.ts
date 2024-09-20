import {DOMAIN} from '@env';
import {axiosTypes} from '@src/types/api';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${DOMAIN}`,
});

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
