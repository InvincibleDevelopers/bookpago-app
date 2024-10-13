import {ReviewItem, postToggleReviewLikes} from '@src/api/book';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';

const useReviewLikes = (reviewId: number, isbn: number, myKakaoId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: () => {
      queryClient.setQueriesData<ReviewItem[]>(
        {
          queryKey: ['/reviews/:isbn', isbn, myKakaoId],
        },
        prev => {
          if (!prev) {
            return prev;
          }

          const newItems = prev.map(item => {
            if (item.id !== reviewId) {
              return item;
            }

            const currIsLiked = item.isLiked;
            const currIsLikes = item.likes;
            // 현재 좋아요 중이면 좋아요 해제후 1빼기
            // 현재 좋아요 중아니면 좋아요 후 1더하기
            return {
              ...item,
              isLiked: !currIsLiked,
              likes: currIsLiked ? currIsLikes - 1 : currIsLikes + 1,
            };
          });

          return newItems;
        },
      );
    },
    mutationFn: postToggleReviewLikes,
    onError: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/reviews/:isbn', isbn, myKakaoId],
      });
      Alert.alert('오류가 발생하였습니다.', '잠시후 다시 시도해주세요.');
    },
  });
};

export default useReviewLikes;
