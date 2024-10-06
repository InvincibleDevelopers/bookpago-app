import {useQuery} from '@tanstack/react-query';
import {getProfile} from '@src/api/profile';

const useProfile = (myKakaoId: number, profileKakaoId: number) => {
  return useQuery({
    queryKey: ['/profile/:kakaoId', profileKakaoId],
    queryFn: async () =>
      getProfile({
        myKakaoId: myKakaoId,
        currentUserKakaoId: profileKakaoId,
      }),
    enabled: !!myKakaoId,
  });
};

export default useProfile;
