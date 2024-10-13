import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAuthenticated} from '@src/api/auth';
import fetcher from '@src/api/axios';
import CustomText from '@src/components/CustomText';
import InputField from '@src/components/InputField';
import Spacer from '@src/components/common/Spacer';
import BackHeader from '@src/components/common/header/BackHeader';
import {colors} from '@src/constants/colors';
import {AuthStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'TestLogin'>;

const TestLoginScreen = ({navigation}: Props) => {
  const ctx = useContext(MainContext);
  const [kakaoId, setKakaoId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeKakaoId = (text: string) => {
    setKakaoId(text.replace(/[^0-9]/g, ''));
  };

  const testLogin = async () => {
    try {
      setIsLoading(() => true);
      const loginBody = await getAuthenticated(Number(kakaoId));

      if (!loginBody.isUser) {
        Alert.alert('가입되지 않은 사용자입니다.');
        return;
      }

      ctx.login({kakaoId: Number(kakaoId)});
    } catch (e) {
      setIsLoading(() => false);
      Alert.alert('로그인에 실패했습니다.', '잠시후 다시시도 해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader imageProps={{onPress: navigation.goBack}} />
      <Spacer height={40} />
      <KeyboardAvoidingView style={styles.keybordeAvoidingView}>
        <View style={styles.topBox}>
          <Text style={[styles.text, {textAlign: 'center'}]}>
            카카오 아이디
          </Text>
          <Spacer height={20} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={onChangeKakaoId}
            multiline={false}
            placeholder="카카오 아이디를 입력해주세요"
            placeholderTextColor={colors.GRAY_400}
          />
        </View>
        <TouchableOpacity onPress={testLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText} disabled={isLoading}>
            로그인
          </Text>
        </TouchableOpacity>
        <Spacer height={20} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  keybordeAvoidingView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  input: {
    backgroundColor: colors.GRAY,
    color: colors.BLACK,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  topBox: {
    flex: 1,
  },
  bottomBox: {
    flex: 1,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: colors.THEME,
    borderRadius: 5,
  },
  loginButtonText: {
    color: colors.WHITE,
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default TestLoginScreen;
