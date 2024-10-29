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
  TouchableOpacity,
} from 'react-native';
import {colors} from '@src/constants';
import {Rating} from 'react-native-ratings';
import {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postReview} from '@src/api/book';
import Icon from 'react-native-vector-icons/AntDesign';
import Divider from '../common/Divider';
import Spacer from '../common/Spacer';

interface PostReviewModalProps {
  isShow: boolean;
  isbn: number;
  myKakaoId: number;
  onClose: () => void;
}

const PostReviewModal = ({
  isShow,
  isbn,
  myKakaoId,
  onClose,
}: PostReviewModalProps) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const mutatePostReview = useMutation({
    mutationFn: postReview,
    onSuccess: async () => {
      // 리뷰 작성 성공시 캐시를 삭제, 댓글 전체를 다시 가져오도록 함
      queryClient.removeQueries({
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

  const onFinishedRating = (rate: number) => {
    setRating(() => rate);
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
        <View style={styles.outer}>
          <KeyboardAvoidingView>
            <View style={styles.inner}>
              <View style={{flex: 1}}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>평점을 선택해주세요</Text>
                  <TouchableOpacity onPress={onClose}>
                    <Icon name="close" size={30} color={colors.GRAY_300} />
                  </TouchableOpacity>
                </View>

                <Spacer height={14} />

                <View style={styles.ratingBox}>
                  <Rating
                    ratingTextColor={colors.BLACK}
                    type="custom"
                    onFinishRating={onFinishedRating}
                    minValue={0}
                    startingValue={3}
                    ratingCount={5}
                    fractions={2} // 분수
                    jumpValue={0.5}
                    tintColor={styles.rating.backgroundColor} // outer color
                    ratingColor="#FFB900" // selected color
                    ratingBackgroundColor="#D9D9D9" //unSelected color
                    style={styles.rating}
                    imageSize={40}
                  />
                  <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
                </View>

                <Spacer height={14} />

                <Divider type="horizontal" style={{height: 1}} />

                <Spacer height={20} />

                <TextInput
                  style={styles.input}
                  value={content}
                  onChangeText={setContent}
                  placeholder={'댓글을 입력해주세요.'}
                  placeholderTextColor={colors.GRAY_300}
                  numberOfLines={5}
                  returnKeyType="send"
                  textAlignVertical="top" //android only
                  multiline
                />
              </View>

              <Spacer height={20} />

              <Pressable
                onPress={onSubmit}
                style={[
                  styles.submitButton,
                  mutatePostReview.isPending && styles.sumitButtonLoading,
                ]}>
                <Text style={styles.submitButtonText}>댓글 작성</Text>
              </Pressable>
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
  outer: {
    // 중앙 정렬
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').width - 40,
    backgroundColor: colors.WHITE,
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  ratingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    paddingVertical: 10,
    backgroundColor: colors.WHITE, // outer color
  },
  ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  input: {
    flex: 1,
    color: 'black',
    backgroundColor: colors.GRAY,
    borderRadius: 10,
    padding: 10,
  },
  submitButton: {
    backgroundColor: colors.THEME,
    padding: 10,
    borderRadius: 9999,
  },
  sumitButtonLoading: {
    opacity: 0.5,
  },
  submitButtonText: {
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: 18,
  },
});

export default PostReviewModal;
