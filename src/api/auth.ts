import fetcher from './axios';

type SuccessLogin = {
  imageUrl: string | null;
  isUser: boolean;
  kakaoid: number;
  nickname: string;
};

type FailLogin = {
  imageUrl: null;
  isUser: false;
  kakaoid: null;
  nickname: null;
};

export const getAuthenticated = async (id: number) => {
  const response = await fetcher.get<SuccessLogin | FailLogin>(
    '/user/login?kakaoId=' + id,
  );
  return response.data;
};

export type JoinBody = {
  nickname: string;
  gender: string;
  genre: string;
  introduce: string;
  age: number;
  kakaoOauthToken: string;
};

export const postKakaoJoin = async (body: JoinBody) => {
  const response = await fetcher.post('/user/kakaojoin', body);
  return response.data;
};
