import { DOMAIN } from '@env';
import {
  getProfile,
  login,
} from '@react-native-seoul/kakao-login';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import InputField from '@src/components/InputField';
import { colors } from '@src/constants/colors';
import { AuthScreens } from '@src/types';
import { UserProfile } from '@src/types/UserProfile';
import { MainContext } from '@src/utils/Context';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

type Props = NativeStackScreenProps<AuthScreens, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const {setToken, setUser, setLogin, setNickname} = useContext(MainContext);
  const [user, setCurrentUser] = useState<UserProfile>({age: 0, username: -1, nickname: ""});
  const [finished, setFinished] = useState(false);

  const KakaoLogin = async () => {
    const result = await login();

    const userProfile = await getProfile();
    const profile: UserProfile = {
      username: userProfile.id,
      nickname: userProfile.nickname,
      age: 0,
      kakaoOauthToken: result.accessToken,
    };
    
    setCurrentUser(profile);
    setNickname(profile.nickname);
  };

  const Submit = async () => {
    const result = await axios.post(`${DOMAIN}/user/kakaojoin`, 
      user
    );
    EncryptedStorage.setItem("serverToken", String(result.data.serverToken));
    EncryptedStorage.setItem("username", String(user.username));
    setFinished(true);
    setUser(user);
    setLogin(true);
  };

  if (!user.kakaoOauthToken) {
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
  else if(finished){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <CustomButton
            bApplyCommonStyle={false}
            imageprops={{
              source: require('@src/assets/auth/logo.png'),
              resizeMode: 'center',
            }}
          />
          <Image
            style={{top: -40}}
            source={require('@src/assets/auth/title.png')}
            resizeMode="center"
          />
        </View>
      </SafeAreaView>
    );
  }
  else {
    return(
      <SafeAreaView style={styles.container}>
        <View>
          <CustomText style={{fontSize: 20}}>추가 정보를 입력해주세요</CustomText>
        </View>
        <View style={styles.additional}>
          <InputField value={user?.nickname} onChangeText={(text)=>setCurrentUser((prev)=>{return {...prev, nickname: text};})} text={"닉네임"} />
          <InputField value={String(user?.age)} onChangeText={(text)=>setCurrentUser((prev)=>{return {...prev, age: Number(text)};})} text={"나이"} />
          <InputField value={user?.gender} onChangeText={(text)=>setCurrentUser((prev)=>{return {...prev, gender: text};})} text={"성별"} />
          <InputField value={user?.genre} onChangeText={(text)=>setCurrentUser((prev)=>{return {...prev, genre: text};})} text={"관심장르"} />
          <InputField value={user?.introduce} onChangeText={(text)=>setCurrentUser((prev)=>{return {...prev, introduce: text};})} placeholder={"소개글을 입력해주세요"} text={"소개글"} />
          <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
            <CustomButton onPress={Submit} bApplyCommonStyle={true} containerstyle={styles.submit} text={"작성완료"} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
    justifyContent: "center",
    gap: 10,
  },
  submit: {
    height: 50,
    width: 100,
  },
});

export default LoginScreen;
