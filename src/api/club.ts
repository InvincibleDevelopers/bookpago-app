import {CLUB_PAGE_SIZE} from '@src/constants';
import fetcher from './axios';

/** page는 0부터 시작  */
export const getClubs = async (page: number) => {
  const response = await fetcher.get<{content: SocialClub[]}>(
    `/social/clubs?page=${page <= 0 ? 0 : page - 1}&size=${CLUB_PAGE_SIZE}`,
  );
  return response.data;
};

export type GetClubDetailArg = {
  kakaoId: number;
  clubId: number;
};

export type member = {
  kakaoId: number;
  nickname: string;
  imgUrl?: string;
};

export const getClubDetail = async ({clubId}: GetClubDetailArg) => {
  const response = await fetcher.get<
    {
      adminId: number;
      memberList: member[];
      applicantList: member[];
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

export const deleteJoinClub = async ({clubId, kakaoId}: PostAccessClubArg) => {
  const response = await fetcher({
    url: `/social/clubs/${clubId}/members`,
    method: 'DELETE',
    data: {kakaoId},
  });
  return response.data.success;
};

type ClubAdminArg = {
  clubId: number;
  adminKakaoId: number;
  memberKakaoId: number;
};

// admin
export const postAcceptMember = async ({
  clubId,
  adminKakaoId,
  memberKakaoId,
}: ClubAdminArg) => {
  console.log('postAcceptMember', clubId, adminKakaoId, memberKakaoId);
  const response = await fetcher.post<{success: boolean}>(
    `/social/clubs/${clubId}/applicants`,
    {
      kakaoId: adminKakaoId,
      applicants: [memberKakaoId],
    },
  );

  return response.data;
};

export const deleteAcceptMember = async ({
  clubId,
  adminKakaoId,
  memberKakaoId,
}: ClubAdminArg) => {
  const response = await fetcher<{success: boolean}>({
    url: `/social/clubs/${clubId}/applicants`,
    method: 'DELETE',
    data: {
      kakaoId: adminKakaoId,
      applicants: [memberKakaoId],
    },
  });
  return response.data;
};

export const deleteExistMember = async ({
  clubId,
  adminKakaoId,
  memberKakaoId,
}: ClubAdminArg) => {
  const response = await fetcher<{success: boolean}>({
    url: `/social/clubs/${clubId}/admin`,
    method: 'DELETE',
    data: {
      kakaoId: adminKakaoId,
      members: [memberKakaoId],
    },
  });
  return response.data;
};
