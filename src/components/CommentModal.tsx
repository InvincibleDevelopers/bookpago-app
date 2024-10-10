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

interface CommentModalProps {
  isShow: boolean;
  onClose: () => void;
}

const CommentModal = ({isShow, onClose}: CommentModalProps) => {
  return (
    <Modal visible={isShow} animationType="fade" transparent>
      <View style={styles.background}>
        <View style={styles.box}>
          <KeyboardAvoidingView>
            <View style={styles.inner}>
              <Text>asdasdasdasd</Text>
              <View>
                <TextInput
                  multiline
                  numberOfLines={5}
                  style={{color: 'black', backgroundColor: colors.GRAY}}
                />
                <Pressable onPress={onClose}>
                  <Text>닫기</Text>
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
});

export default CommentModal;
