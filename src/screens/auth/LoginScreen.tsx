import {getProfile, login} from '@react-native-seoul/kakao-login';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAuthenticated} from '@src/api/auth';
import Spacer from '@src/components/common/Spacer';
import KaKaoButton from '@src/components/common/button/KakaoButton';
import {colors} from '@src/constants/colors';
import {AuthStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const ctx = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);

  const KakaoLogin = async () => {
    try {
      setIsLoading(() => true);
      const result = await login();
      const userProfile = await getProfile();
      const id = userProfile.id;

      const loginBody = await getAuthenticated(id);

      if (!loginBody.isUser) {
        navigation.navigate('Join', {
          kakaoId: userProfile.id,
          kakaoOauthToken: result.accessToken,
        });
        return;
      }

      ctx.login({kakaoId: userProfile.id});
    } catch (e) {
      setIsLoading(() => false);
      Alert.alert('로그인에 실패했습니다.', '잠시후 다시시도 해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.text}>반갑습니다!</Text>
        <Text style={styles.text}>
          <Text style={styles.textAccent}>로그인</Text>을 해주세요.
        </Text>
      </View>
      <View style={styles.bottomBox}>
        <KaKaoButton onPress={KakaoLogin} disabled={isLoading} />
        <Spacer height={20} />
        <TouchableOpacity
          onPress={() => navigation.navigate('TestLogin')}
          disabled={isLoading}>
          <Text style={{color: colors.GRAY_400}}>테스트 로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  topBox: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  textAccent: {
    color: colors.THEME,
  },
  bottomBox: {
    flex: 1,
    alignItems: 'center',
  },
});

export default LoginScreen;
