import CustomText from '@src/components/CustomText';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface NicknameProps {
  editable?: boolean;
  nickname: string;
  onPress?: () => void;
}

const NicknameButton = ({editable, nickname, onPress}: NicknameProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!editable}>
      <CustomText style={styles.text} numberOfLines={1}>
        {nickname}
      </CustomText>

      {editable && (
        <Image
          source={require('@src/assets/icons/edit.png')}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  text: {
    fontSize: 20,
    marginRight: 10,
  },
  icon: {
    width: 18,
    height: 18,
  },
});

export default NicknameButton;
