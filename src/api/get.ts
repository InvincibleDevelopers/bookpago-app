import {get} from './axios';

export type GetClubDetailArg = {
  kakaoId: number;
  clubId: number;
};

export const getClubDetail = async ({clubId}: GetClubDetailArg) => {
  const body: SocialClub = await get({path: `/social/clubs/${clubId}`});
  return body;
};
