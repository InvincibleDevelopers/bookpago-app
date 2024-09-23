import CustomButton from '@src/components/CustomButton';
import {StyleSheet} from 'react-native';

interface MypageButtonProps {
  onPress: () => void;
}

const MypageButton = ({onPress}: MypageButtonProps) => {
  return (
    <CustomButton
      onPress={onPress}
      bApplyCommonStyle={false}
      style={styles.container}
      imageprops={{
        style: {width: 30, height: 30},
        resizeMode: 'contain',
        source: require('@src/assets/buttons/my.png'),
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
  },
});

export default MypageButton;
