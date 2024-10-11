import {useCallback, useState, useContext} from 'react';
import {FlatList, Pressable, Text} from 'react-native';
import CommentModal from '../CommentModal';
import Review from './Review';
import {useQuery} from '@tanstack/react-query';
import fetcher from '@src/api/axios';
import {MainContext} from '@src/utils/Context';
import Divider from '../common/Divider';
import {colors} from '@src/constants';

interface ReviewListProps {
  isbn: number;
}

const ReviewList = ({isbn}: ReviewListProps) => {
  const [isShowCommentModal, setIsShowCommentModal] = useState(false);
  const {kakaoId} = useContext(MainContext);

  const reviewQuery = useQuery({
    queryKey: ['reviews', isbn, kakaoId],
    queryFn: async () => {
      const response = await fetcher.get(
        `/review/${isbn}?kakaoId=${kakaoId}&page=0&size=20`,
      );
      return response.data;
    },
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
    ({item}: {item: any}) => {
      return <Review onPress={openCommentModal} />;
    },
    [openCommentModal],
  );

  return (
    <>
      <FlatList
        keyExtractor={(d, index) => `comment_${index}`}
        data={[1, 2, 3, 4]}
        ItemSeparatorComponent={() => (
          <Divider type="horizontal" style={{height: 2}} />
        )}
        renderItem={renderItem}
        style={{
          backgroundColor: colors.WHITE_200, // outer color
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{}}
      />
      <CommentModal onClose={closeCommentModal} isShow={isShowCommentModal} />
    </>
  );
};

export default ReviewList;
