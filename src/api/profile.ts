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
