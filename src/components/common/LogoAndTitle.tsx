import {View, Image, StyleSheet} from 'react-native';
import Spacer from '@src/components/common/Spacer';

const LogoAndTitle = () => {
  return (
    <View style={styles.box}>
      <Image
        source={require('@src/assets/logo/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Spacer height={30} />
      <Image
        source={require('@src/assets/logo/title.png')}
        style={styles.titleImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {alignItems: 'center'},
  logoImage: {
    width: 105,
    height: 115,
  },
  titleImage: {
    width: 180,
    height: 55,
    borderWidth: 2,
  },
});

export default LogoAndTitle;
