import {useQuery} from '@tanstack/react-query';
import {GET_PROFILE_KEY, getProfile} from '@src/api/profile';

const useProfile = (myKakaoId: number | null, profileKakaoId: number) => {
  if (!myKakaoId) {
    throw new Error('useProfile: myKakaoId is required');
  }

  return useQuery({
    queryKey: [GET_PROFILE_KEY, myKakaoId, profileKakaoId],
    queryFn: async () =>
      getProfile({
        myKakaoId: myKakaoId,
        currentUserKakaoId: profileKakaoId,
      }),
    enabled: !!myKakaoId,
  });
};

export default useProfile;
