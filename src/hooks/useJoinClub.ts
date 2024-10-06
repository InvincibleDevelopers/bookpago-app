import {deleteJoinClub, postJoinClub} from '@src/api/club';
import {useMutation, useQueryClient} from '@tanstack/react-query';

type JoinClubArg = {
  kakaoId: number;
  clubId: number;
  isJoin: boolean;
};

const useJoinClub = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (arg: JoinClubArg) =>
      !arg.isJoin
        ? postJoinClub({clubId: arg.clubId, kakaoId: arg.kakaoId})
        : deleteJoinClub({clubId: arg.clubId, kakaoId: arg.kakaoId}),
    onSettled: async (_data, _error, arg) => {
      await queryClient.invalidateQueries({
        queryKey: ['/social/clubs/:clubId', arg.clubId],
      });
    },
  });
};

export default useJoinClub;
