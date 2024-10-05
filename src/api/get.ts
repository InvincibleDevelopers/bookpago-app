import {get} from './axios';

export type GetClubDetailArg = {
  kakaoId: number;
  clubId: number;
};

export const getClubDetail = async ({clubId}: GetClubDetailArg) => {
  const body: SocialClub = await get({path: `/social/clubs/${clubId}`});
  return body;
};

export const getProfile = async ({
  myKakaoId,
  currentUserKakaoId,
}: {
  myKakaoId: number;
  currentUserKakaoId: number;
}) => {
  const body: {
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
  } = await get({
    path: `/profile/${myKakaoId}?currentUserKakaoId=${currentUserKakaoId}`,
  });
  return body;
};
