import {postToggleFollow} from '@src/api/profile';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';

const useFollow = (kakaoId: number | null) => {
  if (!kakaoId) {
    throw new Error('useFollow: kakaoId is required');
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (arg: {myId: number; otherId: number}) => {
      if (arg.myId === arg.otherId) {
        throw new Error('자신을 팔로우 할 수 없습니다.');
      }
      const result = await postToggleFollow(arg.myId, arg.otherId);
      return result;
    },
    onError: async (error, arg) => {
      // await queryClient.invalidateQueries({queryKey: ['/books/:isbn']});
      Alert.alert('팔로우 실패', error.message);
    },
  });

  return mutation;
};

export default useFollow;
