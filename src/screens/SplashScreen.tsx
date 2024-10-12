import LogoAndTitle from '@src/components/common/LogoAndTitle';
import {colors} from '@src/constants';
import {StyleSheet, SafeAreaView} from 'react-native';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LogoAndTitle />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
});

export default SplashScreen;
