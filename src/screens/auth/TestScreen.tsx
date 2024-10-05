import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import CustomText from '@src/components/CustomText';
import InputField from '@src/components/InputField';
import BackHeader from '@src/components/common/header/BackHeader';
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

type SuccessLogin = {
  imageUrl: string | null;
  isUser: boolean;
  kakaoid: number;
  nickname: string;
};

type FailLogin = {
  imageUrl: null;
  isUser: false;
  kakaoid: null;
  nickname: null;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Test'>;

const TestScreen = ({navigation}: Props) => {
  const ctx = useContext(MainContext);
  const [kakaoId, setKakaoId] = useState('');

  const testLogin = async () => {
    // const id = userProfile.id;
    // const id = 3709787671; // 민욱
    // const id = 3704616859; // 테스트
    console.log('login', kakaoId);
    const loginBody: SuccessLogin | FailLogin = await get({
      path: '/user/login?kakaoId=' + kakaoId,
    });

    console.log('login', kakaoId);

    if (loginBody.isUser) {
      ctx.login({kakaoId: Number(kakaoId)});
    } else {
      Alert.alert('없는 유저입니다. 회원가입을 해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader imageProps={{onPress: navigation.goBack}} />
      <View style={styles.title}>
        <CustomText>반갑습니다!</CustomText>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <CustomText style={{color: colors.THEME}}>로그인</CustomText>
          <CustomText>카카오 아이디를 입력 해주세요</CustomText>
        </View>
      </View>
      <View style={styles.loginbuttons}>
        <InputField
          text="카카오 아이디"
          value={kakaoId}
          onChangeText={setKakaoId}
        />
        <TouchableOpacity onPress={testLogin}>
          <Text style={styles.submit}>로그인</Text>
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
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    top: 127,
  },
  inputfield: {
    gap: 20,
    top: 150,
  },
  bottom: {
    top: 420,
    alignItems: 'center',
  },
  loginbuttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  additional: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  submit: {
    height: 50,
    width: 100,
  },
});

export default TestScreen;
