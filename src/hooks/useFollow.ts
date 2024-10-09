import {
  GET_PROFILE_KEY,
  GetProfileData,
  postToggleFollow,
} from '@src/api/profile';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';

const useFollow = (myKakaoId: number | null) => {
  if (!myKakaoId) {
    throw new Error('useFollow: kakaoId is required');
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    onMutate: async arg => {
      queryClient.setQueryData<GetProfileData>(
        [GET_PROFILE_KEY, myKakaoId, arg.otherId],
        prev => {
          if (!prev) return prev;
          return {
            ...prev,
            isFollow: !prev.isFollow,
          };
        },
      );
    },
    mutationFn: async (arg: {otherId: number}) => {
      if (myKakaoId === arg.otherId) {
        throw new Error('자신을 팔로우 할 수 없습니다.');
      }
      const result = await postToggleFollow(myKakaoId, arg.otherId);
      return result;
    },
    onError: async (error, arg) => {
      await queryClient.invalidateQueries({
        queryKey: [GET_PROFILE_KEY, myKakaoId, arg.otherId],
      });
      Alert.alert('팔로우 실패', error.message);
    },
  });

  return mutation;
};

export default useFollow;
