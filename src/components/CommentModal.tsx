import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import DismissKeyboardView from './common/DismissKeyboardView';
import {colors} from '@src/constants';
import {Rating} from 'react-native-ratings';
import {useState} from 'react';

interface CommentModalProps {
  isShow: boolean;
  onClose: () => void;
}

const CommentModal = ({isShow, onClose}: CommentModalProps) => {
  const [rating, setRating] = useState(5);
  const onFinishedRating = (e: number) => {
    setRating(() => e);
  };

  return (
    <Modal visible={isShow} animationType="fade" transparent>
      <View style={styles.background}>
        <View style={styles.box}>
          <KeyboardAvoidingView>
            <View style={styles.inner}>
              <Pressable>
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
                  numberOfLines={5}
                  style={{color: 'black', backgroundColor: colors.GRAY}}
                />
                <Pressable onPress={onClose}>
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
