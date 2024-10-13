import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {colors} from '@src/constants';
import {Rating} from 'react-native-ratings';
import {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postReview} from '@src/api/book';

interface CommentModalProps {
  isShow: boolean;
  isbn: number;
  myKakaoId: number;
  onClose: () => void;
}

const CommentModal = ({
  isShow,
  isbn,
  myKakaoId,
  onClose,
}: CommentModalProps) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const mutatePostReview = useMutation({
    mutationFn: postReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/reviews/:isbn', isbn, myKakaoId],
      });
      Alert.alert('리뷰 작성이 완료되었습니다.', '', [
        {
          text: '확인',
          onPress: onClose,
        },
      ]);
    },
    onError: () => {
      Alert.alert('리뷰 작성에 실패했습니다.', '잠시후 다시 시도해주세요.');
    },
  });

  const onFinishedRating = (e: number) => {
    setRating(() => e);
  };

  const onSubmit = () => {
    if (mutatePostReview.isPending) {
      return;
    }

    mutatePostReview.mutate({
      isbn,
      rating,
      kakaoId: myKakaoId,
      content,
    });
  };

  return (
    <Modal visible={isShow} animationType="fade" transparent>
      <View style={styles.background}>
        <View style={styles.box}>
          <KeyboardAvoidingView>
            <View style={styles.inner}>
              <Pressable onPress={onClose}>
                <Text>닫기</Text>
              </Pressable>
              <Text>asdasdasdasd</Text>
              <Rating
                ratingTextColor={colors.BLACK}
                type="custom"
                onFinishRating={onFinishedRating}
                minValue={0}
                startingValue={3}
                ratingCount={5}
                fractions={1} // 분수
                jumpValue={0.5}
                tintColor={styles.rating.backgroundColor} // outer color
                ratingColor="#FFB900" // selected color
                ratingBackgroundColor="#D9D9D9" //unSelected color
                style={styles.rating}
                imageSize={40}
              />
              <View>
                <TextInput
                  multiline
                  value={content}
                  onChangeText={setContent}
                  numberOfLines={5}
                  style={{color: 'black', backgroundColor: colors.GRAY}}
                />
                <Pressable onPress={onSubmit}>
                  <Text>댓글 작성</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').width - 40,
    backgroundColor: colors.WHITE,
  },
  rating: {
    paddingVertical: 10,
    backgroundColor: colors.BACKGROUND, // outer color
  },
});

export default CommentModal;
