import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import LogoAndTitle from '@src/components/common/LogoAndTitle';
import {colors} from '@src/constants/colors';
import {AuthStackParamList} from '@src/types';
import {SafeAreaView, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'AuthMain'>;

const AuthMainScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <LogoAndTitle />
      <CustomButton
        onPress={() => navigation.navigate('Login')}
        containerstyle={styles.button}
        text="로그인하기"
      />
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
  button: {
    position: 'absolute',
    flex: 1,
    bottom: 40,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default AuthMainScreen;
