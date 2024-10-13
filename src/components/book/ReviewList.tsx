import {ReviewItem, getReview} from '@src/api/book';
import {colors} from '@src/constants';
import {MainContext} from '@src/utils/Context';
import {useQuery} from '@tanstack/react-query';
import {useCallback, useContext, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CommentModal from '../CommentModal';
import Divider from '../common/Divider';
import Spacer from '../common/Spacer';
import Review from './Review';

interface ReviewListProps {
  isbn: number;
}

const ReviewList = ({isbn}: ReviewListProps) => {
  const [isShowCommentModal, setIsShowCommentModal] = useState(false);
  const {kakaoId} = useContext(MainContext);

  const reviewQuery = useQuery({
    queryKey: ['/reviews/:isbn', isbn, kakaoId],
    queryFn: () => getReview(isbn, kakaoId!, 1),
  });

  const openCommentModal = useCallback(
    () => setIsShowCommentModal(() => true),
    [],
  );
  const closeCommentModal = useCallback(
    () => setIsShowCommentModal(() => false),
    [],
  );

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
          onPress={openCommentModal}
        />
      );
    },
    [openCommentModal, kakaoId, isbn],
  );

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
    <>
      <FlatList
        keyExtractor={(d, index) => `comment_${index}`}
        data={reviewQuery.data}
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
      />
      <CommentModal
        myKakaoId={kakaoId!}
        isbn={isbn}
        onClose={closeCommentModal}
        isShow={isShowCommentModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  grayText: {
    color: colors.GRAY_300,
    fontSize: 14,
  },
});

export default ReviewList;
