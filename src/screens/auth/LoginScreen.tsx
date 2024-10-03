import {DOMAIN} from '@env';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile,
  login,
} from '@react-native-seoul/kakao-login';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get, post} from '@src/api/axios';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import InputField from '@src/components/InputField';
import DismissKeyboardView from '@src/components/common/DismissKeyboardView';
import {colors} from '@src/constants/colors';
import {AuthStackParamList} from '@src/types';
import {UserProfile} from '@src/types/UserProfile';
import {MainContext} from '@src/utils/Context';
import {useContext, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

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

type JoinBody = {
  nickname: string;
  age: string;
  gender: string;
  genre: string;
  introduce: string;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const ctx = useContext(MainContext);
  const [step, setStep] = useState<0 | 1>(0);
  const [profile, setProfile] = useState<
    (KakaoProfile & {kakaoOauthToken: string}) | null
  >(null);
  const [joinBody, setJoinBody] = useState<JoinBody>({
    age: '',
    nickname: '',
    gender: '',
    genre: '',
    introduce: '',
  });

  const KakaoLogin = async () => {
    const result = await login();
    const userProfile = await getProfile();

    const loginBody: SuccessLogin | FailLogin = await get({
      path: '/user/login?kakaoId=' + userProfile.id,
    });

    console.log('login', loginBody);

    if (loginBody.isUser) {
      ctx.login({kakaoId: userProfile.id});
    } else {
      setStep(() => 1);
      setProfile(() => ({...userProfile, kakaoOauthToken: result.accessToken}));
    }
  };

  const Submit = async () => {
    const id = profile?.id;
    if (!id) return;

    const result = await post({
      path: '/user/kakaojoin',
      body: {
        ...joinBody,
        kakaoOauthToken: profile.kakaoOauthToken,
        age: Number(joinBody.age) || 0,
      },
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
