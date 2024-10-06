import fetcher from './axios';

export const getProfile = async ({
  myKakaoId,
  currentUserKakaoId,
}: {
  myKakaoId: number;
  currentUserKakaoId: number;
}) => {
  const body = await fetcher.get<{
    isFollow: boolean;
    profile: {
      userId: number;
      nickname: string;
      introduce: string;
      imageUrl?: string;
      wishIsbnList: number[];
      readingClubDto: {
        content: SocialClub[];
      };
    };
  }>(`/profile/${myKakaoId}?currentUserKakaoId=${currentUserKakaoId}`);
  return body.data;
};

interface ProfileImageArg {
  file: {
    uri: string;
    type: string;
    name: string;
  };
  kakaoId: number;
}

export const patchProfileImage = async ({file, kakaoId}: ProfileImageArg) => {
  console.log('patchProfileImage', file, kakaoId);

  const formData = new FormData();

  formData.append('file', file);

  const response = await fetcher.patch<{
    userId: number;
    nickname: string;
    introduce: string;
    imageUrl: string;
    wishIsbnList: number[];
    readingClubDto: null;
  }>(`/profile/image?kakaoId=${kakaoId}`, file, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  console.log(response);
  return response.data;
};

type PatchProfileBody = {
  kakaoId: number;
  nickname: string;
  introduce: string;
};

export const patchProfile = async (body: PatchProfileBody) => {
  const response = await fetcher.patch(`/profile/${body.kakaoId}`, body);
  console.log(response);
  return response.data;
};
