import {CLUB_PAGE_SIZE} from '@src/constants';
import fetcher from './axios';

/** page는 0부터 시작  */
export const getClubs = async (page: number) => {
  const response = await fetcher.get<{content: SocialClub[]}>(
    `/social/clubs?page=${page}&size=${CLUB_PAGE_SIZE}`,
  );
  return response.data;
};

export type GetClubDetailArg = {
  kakaoId: number;
  clubId: number;
};

export const getClubDetail = async ({clubId}: GetClubDetailArg) => {
  const response = await fetcher.get<
    {
      adminId: number;
    } & SocialClub
  >(`/social/clubs/${clubId}`);
  return response.data;
};

export type PostAccessClubArg = {
  clubId: number;
  kakaoId: number;
};

export type PostClubBody = {
  kakaoId: number;
  location: string;
  clubName: string;
  weekDay: number[];
  description: string;
  time: string;
};

export const postClub = async (club: PostClubBody) => {
  const response = await fetcher.post<SocialClub>('/social/clubs', club);
  return response.data;
};

/** 독서모임 참가 또는 나가기 이후 상세페이지 리셋 */
export const postJoinClub = async ({clubId, kakaoId}: PostAccessClubArg) => {
  const response = await fetcher.post<{
    success: boolean;
  }>(`/social/clubs/${clubId}/members`, {
    kakaoId,
  });
  return response.data.success;
};

// export const deleteJoinClub = async ({
//   clubId,
//   kakaoId,
// }: PostAccessClubArg) => {
//   await
// };
