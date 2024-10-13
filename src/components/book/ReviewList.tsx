import {ReviewItem, getReview} from '@src/api/book';
import {REVIEW_PAGE_SIZE, colors} from '@src/constants';
import {MainContext} from '@src/utils/Context';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useCallback, useContext, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Divider from '../common/Divider';
import Spacer from '../common/Spacer';
import Review from './Review';
import {checkIsEndPage} from '@src/api/queryClient';

interface ReviewListProps {
  isbn: number;
}

const ReviewList = ({isbn}: ReviewListProps) => {
  const {kakaoId} = useContext(MainContext);

  const reviewQuery = useInfiniteQuery({
    queryKey: ['/reviews/:isbn', isbn, kakaoId],
    queryFn: ({pageParam}) => getReview(isbn, kakaoId!, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage, _lastPageParam, _allPageParams) => {
      return checkIsEndPage(lastPage, allPage, REVIEW_PAGE_SIZE);
    },
  });

  const renderItem = useCallback(
    ({item}: {item: ReviewItem}) => {
      return (
        <Review
          myKakaoId={kakaoId!}
          isbn={isbn}
          reviewId={item.id}
          rating={item.rating}
          nickname={item.nickname}
          content={item.content}
          isLiked={item.isLiked}
          likes={item.likes}
          profileImage={item.profileImage}
        />
      );
    },
    [kakaoId, isbn],
  );

  const onEndReached = () => {
    if (reviewQuery.hasNextPage && !reviewQuery.isFetchingNextPage) {
      reviewQuery.fetchNextPage();
    }
  };

  const reviewList = useMemo(() => {
    if (!reviewQuery.data) return [];
    return reviewQuery.data.pages.flat();
  }, [reviewQuery.data]);

  if (reviewQuery.isError) {
    return (
      <View style={{alignItems: 'center'}}>
        <Spacer height={20} />
        <Text style={styles.grayText}>댓글 불러오기에 실패 했습니다.</Text>
        <Spacer height={20} />
      </View>
    );
  }

  if (reviewQuery.isPending) {
    return (
      <View style={{alignItems: 'center'}}>
        <Spacer height={20} />
        <ActivityIndicator size="large" color={colors.THEME} />
        <Spacer height={20} />
      </View>
    );
  }

  return (
    <FlatList
      keyExtractor={(d, index) => `comment_${index}`}
      data={reviewList}
      ItemSeparatorComponent={() => (
        <Divider type="horizontal" style={{height: 2}} />
      )}
      renderItem={renderItem}
      style={{
        backgroundColor: colors.WHITE_200, // outer color
        paddingHorizontal: 20,
      }}
      ListEmptyComponent={() => (
        <View style={{alignItems: 'center'}}>
          <Spacer height={20} />
          <Text style={styles.grayText}>댓글이 없습니다.</Text>
          <Spacer height={20} />
        </View>
      )}
      contentContainerStyle={{}}
      onEndReached={onEndReached}
      ListFooterComponent={<Spacer height={20} />}
    />
  );
};

const styles = StyleSheet.create({
  grayText: {
    color: colors.GRAY_300,
    fontSize: 14,
  },
});

export default ReviewList;
