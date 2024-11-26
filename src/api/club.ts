import {CLUB_PAGE_SIZE} from '@src/constants';
import fetcher from './axios';
import {Alert} from 'react-native';

/** page는 0부터 시작  */
export const getClubs = async (page: number) => {
  const response = await fetcher.get<{content: SocialClub[]}>(
    `/social/clubs?page=${page <= 0 ? 0 : page - 1}&size=${CLUB_PAGE_SIZE}`,
  );
  return response.data;
};

/** page는 0부터 시작  */
export const getClubsWithLocation = async (
  page: number,
  latitude: number | null,
  longitude: number | null,
) => {
  if (latitude === null || longitude === null) {
    Alert.alert('위치 정보를 가져오지 못했습니다.');
    return {content: []};
  }

  const response = await fetcher.get<{content: SocialClub[]}>(
    `/social/clubs/nearby?latitude=${latitude}&longitude=${longitude}&page=${
      page <= 0 ? 0 : page - 1
    }&size=${CLUB_PAGE_SIZE}`,
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

export const getClubDetail = async ({clubId, kakaoId}: GetClubDetailArg) => {
  const response = await fetcher.get<{
    adminId: number;
    memberList: member[];
    applicantList: member[];
    isAdmin: boolean;
    readingClub: {
      address: string | null;
      clubName: string;
      description: string;
      id: number;
      latitude: number;
      longitude: number;
      members: number;
      repeatCycle: number;
      time: string;
      weekDay: number[];
    };
  }>(`/social/clubs/${clubId}?kakaoId=${kakaoId}`);

  const data: {
    adminId: number;
    memberList: member[];
    applicantList: member[];
    isAdmin: boolean;
  } & SocialClub = {
    ...response.data.readingClub,
    ...response.data,
    address: response.data.readingClub.address || '', // 예외처리
  };

  return data;
};

export type PostAccessClubArg = {
  clubId: number;
  kakaoId: number;
};

export type PostClubBody = {
  kakaoId: number;
  address: string;
  longitude: number;
  latitude: number;
  clubName: string;
  weekDay: number[];
  repeatCycle: number;
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
  console.log('clubId', clubId);
  console.log('adminKakaoId', adminKakaoId);
  console.log('memberKakaoId', memberKakaoId);
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
