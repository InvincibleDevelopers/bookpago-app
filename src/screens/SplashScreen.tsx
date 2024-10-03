import {View, ActivityIndicator} from 'react-native';
import {colors} from '@src/constants';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={colors.THEME} />
    </View>
  );
};

export default SplashScreen;
