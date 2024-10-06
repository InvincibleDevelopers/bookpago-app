import {KakaoProfile, getProfile, login} from '@react-native-seoul/kakao-login';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JoinBody, getAuthenticated, postKakaoJoin} from '@src/api/auth';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import InputField from '@src/components/InputField';
import DismissKeyboardView from '@src/components/common/DismissKeyboardView';
import Spacer from '@src/components/common/Spacer';
import {colors} from '@src/constants/colors';
import {AuthStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const ctx = useContext(MainContext);
  const [step, setStep] = useState<0 | 1>(0);
  const [profile, setProfile] = useState<
    (KakaoProfile & {kakaoOauthToken: string}) | null
  >(null);
  const [joinBody, setJoinBody] = useState<
    {age: string} & Omit<JoinBody, 'age' | 'kakaoOauthToken'>
  >({
    age: '',
    nickname: '',
    gender: '',
    genre: '',
    introduce: '',
  });

  const KakaoLogin = async () => {
    const result = await login();
    const userProfile = await getProfile();

    const id = userProfile.id;
    // const id = 3709787671; // 민욱
    // const id = 3704616859; // 테스트
    const loginBody = await getAuthenticated(id);

    if (loginBody.isUser) {
      ctx.login({kakaoId: userProfile.id});
    } else {
      setStep(() => 1);
      setProfile(() => ({...userProfile, kakaoOauthToken: result.accessToken}));
    }
  };

  const Submit = async () => {
    const id = profile?.id;
    if (!id) {
      return;
    }

    const result = await postKakaoJoin({
      ...joinBody,
      kakaoOauthToken: profile.kakaoOauthToken,
      age: Number(joinBody.age) || 0,
    });

    console.log(result);
    ctx.login({kakaoId: id});
  };

  if (step === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <CustomText>반갑습니다!</CustomText>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <CustomText style={{color: colors.THEME}}>로그인</CustomText>
            <CustomText>을 해주세요</CustomText>
          </View>
        </View>
        <View style={styles.loginbuttons}>
          <CustomButton
            onPress={KakaoLogin}
            bApplyCommonStyle={false}
            imageprops={{source: require('@src/assets/logo/kakao.png')}}
          />
          <Spacer height={20} />
          <TouchableOpacity onPress={() => navigation.navigate('Test')}>
            <Text>테스트 로그인</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView style={{flex: 1}}>
        <View>
          <CustomText style={{fontSize: 20}}>
            추가 정보를 입력해주세요
          </CustomText>
        </View>
        <View style={styles.additional}>
          <InputField
            value={joinBody.nickname}
            text={'닉네임'}
            onChangeText={text =>
              setJoinBody(pre => ({...pre, nickname: text}))
            }
          />
          <InputField
            value={joinBody.age}
            text={'나이'}
            onChangeText={text => setJoinBody(pre => ({...pre, age: text}))}
          />
          <InputField
            value={joinBody.gender}
            text={'성별'}
            onChangeText={text => setJoinBody(pre => ({...pre, gender: text}))}
          />
          <InputField
            value={joinBody.genre}
            text={'관심장르'}
            onChangeText={text => setJoinBody(pre => ({...pre, genre: text}))}
          />
          <InputField
            value={joinBody.introduce}
            text={'소개글'}
            placeholder={'소개글을 입력해주세요'}
            onChangeText={text =>
              setJoinBody(pre => ({...pre, introduce: text}))
            }
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <CustomButton
              onPress={Submit}
              bApplyCommonStyle={true}
              containerstyle={styles.submit}
              text={'작성완료'}
            />
          </View>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default LoginScreen;
