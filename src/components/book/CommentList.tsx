import {useCallback, useState} from 'react';
import {FlatList, Pressable, Text} from 'react-native';
import CommentModal from '../CommentModal';
import Comment from './Comment';

const CommentList = () => {
  const [isShowCommentModal, setIsShowCommentModal] = useState(false);
  const renderItem = useCallback(({item}: {item: any}) => {
    return <Comment />;
  }, []);

  const openCommentModal = () => setIsShowCommentModal(() => true);
  const closeCommentModal = () => setIsShowCommentModal(() => false);

  return (
    <FlatList
      keyExtractor={(d, index) => `comment_${index}`}
      data={[1, 2, 3, 4]}
      renderItem={renderItem}
      ListFooterComponent={<CommentModal />}
    />
  );
};

export default CommentList;
