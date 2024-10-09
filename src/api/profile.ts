import {FOLLOW_PAGE_SIZE} from '@src/constants';
import fetcher from './axios';

export type GetProfileData = {
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
};

export const GET_PROFILE_KEY = '/profile/:kakaoId';

export const getProfile = async ({
  myKakaoId,
  currentUserKakaoId,
}: {
  myKakaoId: number;
  currentUserKakaoId: number;
}) => {
  const body = await fetcher.get<GetProfileData>(
    `/profile/${currentUserKakaoId}?kakaoId=${myKakaoId}&currentUserKakaoId=${currentUserKakaoId}`,
  );
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
  const formData = new FormData();

  formData.append('file', file);

  const response = await fetcher.patch<{
    userId: number;
    nickname: string;
    introduce: string;
    imageUrl: string;
    wishIsbnList: number[];
    readingClubDto: null;
  }>(`/profile/image?kakaoId=${kakaoId}`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return response.data;
};

type PatchProfileBody = {
  kakaoId: number;
  nickname: string;
  introduce: string;
};

export const patchProfile = async (body: PatchProfileBody) => {
  const response = await fetcher.patch<{
    userId: number;
    nickname: string;
    introduce: string;
    imageUrl?: string;
    wishIsbnList: any[];
    readingClubDto: null;
  }>(`/profile/${body.kakaoId}`, body);
  return response.data;
};

export const postToggleFollow = async (
  myKakaoId: number,
  otherKakaoId: number,
) => {
  const result = await fetcher.post<string>(`/profile/follow`, {
    followerKakaoId: otherKakaoId, // 하는 사람
    followeeKakaoId: myKakaoId, // 받는 사람
  });

  return result.data;
};

export type FollowItem = {
  profileImgUrl?: string;
  nickname: string;
  kakaoId: number;
};

type FollowResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: FollowItem[];
};

export const getFollowing = async (
  myKakaoId: number | null,
  otherKakaoId: number,
  page: number,
) => {
  if (!myKakaoId) {
    throw new Error('getFollower: kakaoId is required');
  }

  const result = await fetcher.get<FollowResponse>(
    `/profile/${otherKakaoId}/following?kakaoId=${myKakaoId}&page=${
      page <= 0 ? 0 : page - 1
    }&size=${FOLLOW_PAGE_SIZE}`,
  );

  return result.data;
};

export const getFollower = async (
  myKakaoId: number | null,
  otherKakaoId: number,
  page: number,
) => {
  if (!myKakaoId) {
    throw new Error('getFollower: kakaoId is required');
  }

  const result = await fetcher.get<FollowResponse>(
    `/profile/${otherKakaoId}/follower?kakaoId=${myKakaoId}&page=${
      page <= 0 ? 0 : page - 1
    }&size=${FOLLOW_PAGE_SIZE}`,
  );

  return result.data;
};
