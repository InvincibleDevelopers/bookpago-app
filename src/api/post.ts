import {post} from './axios';

export type PostAccessClubArg = {
  clubId: number;
  kakaoId: number;
};

/** 독서모임 참가 또는 나가기 이후 상세페이지 리셋 */
export const postAccessClub = async ({clubId, kakaoId}: PostAccessClubArg) => {
  const body: {
    success: boolean;
  } = await post({
    path: `/social/clubs/${clubId}/members`,
    body: {
      kakaoId,
    },
  });
  return body.success;
};
