import {DOMAIN} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import InputField from '@src/components/InputField';
import IntroduceView from '@src/components/profile/IntroduceView';
import ProfileImageButton from '@src/components/profile/ProfileImageButton';
import useProfile from '@src/hooks/useProfile';
import {MyStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {useContext, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import ProfileLoadingScreen from './ProfileLoadingScreent';
import ProfileErrorScreen from './ProfileErrorScreen';
import MyHeader from '@src/components/profile/MyHeader';
import Spacer from '@src/components/common/Spacer';
import NicknameButton from '@src/components/profile/Nickname';
import Divider from '@src/components/common/Divider';
import DismissKeyboardView from '@src/components/common/DismissKeyboardView';
import {colors} from '@src/constants';
import {patchProfile} from '@src/api/profile';

type Props = NativeStackScreenProps<MyStackParamList, 'Edit'>;

const EditScreen = ({navigation}: Props) => {
  const [nickname, setNickname] = useState('');
  const [introduce, setIntroduce] = useState('');

  const {kakaoId} = useContext(MainContext);

  const myProfileQuery = useProfile(kakaoId!, kakaoId!);
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: patchProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/profile/:kakaoId', kakaoId],
      });

      Alert.alert('설정이 저장되었습니다.');

      navigation.goBack();
    },
    onError: () => {
      Alert.alert(
        '설정을 저장하지 못하였습니다.',
        '반복되면 관리자에게 문의해주세요.',
      );
    },
  });

  const save = () => {
    if (saveMutation.isPending) {
      return;
    }

    saveMutation.mutate({
      kakaoId: kakaoId!,
      nickname,
      introduce,
    });
  };

  if (myProfileQuery.error) {
    const error = myProfileQuery.error as unknown as {error: string};
    return (
      <ProfileErrorScreen profileKakaoId={kakaoId!} messageText={error.error} />
    );
  }

  if (myProfileQuery.isPending) {
    return (
      <ProfileLoadingScreen myKakaoId={kakaoId!} profileKakaoId={kakaoId!} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView>
        <MyHeader
          myKakaoid={kakaoId!}
          profileKakaoId={kakaoId!}
          isShowBackButton
        />

        <IntroduceView>
          <ProfileImageButton imageUri={myProfileQuery.data.profile.imageUrl} />

          <Spacer height={50} />

          <NicknameButton
            nickname={myProfileQuery.data.profile.nickname}
            editable={false}
          />

          <Spacer height={10} />

          <Text style={styles.introduceText}>
            {myProfileQuery.data.profile.introduce}
          </Text>

          <Spacer height={20} />
          <Divider />
          <Spacer height={20} />

          <View style={styles.inputBox}>
            <Text
              style={
                styles.label
              }>{`현재 닉네임: ${myProfileQuery.data.profile.nickname}`}</Text>
            <Spacer height={10} />
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
              placeholder="변경할 닉네임을 입력해주세요"
            />
          </View>

          <Spacer height={20} />

          <View style={styles.inputBox}>
            <Text style={styles.label}>
              {`현재 소개글: ${myProfileQuery.data.profile.introduce}`}
            </Text>
            <Spacer height={10} />
            <TextInput
              style={styles.input}
              value={introduce}
              onChangeText={setIntroduce}
              placeholder="나만의 자기 소개를 적어 주세요"
              multiline
              placeholderTextColor={colors.GRAY_300}
            />
          </View>

          <Spacer height={30} />

          <CustomButton
            containerstyle={[
              {
                borderRadius: 10,
                padding: 10,
              },
              saveMutation.isPending && {opacity: 0.5},
            ]}
            onPress={save}
            text="설정 완료"
            disabled={saveMutation.isPending}
          />
        </IntroduceView>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  introduceText: {
    color: colors.GRAY_400,
  },
  inputBox: {},
  label: {
    color: colors.THEME,
    fontSize: 12,
  },
  input: {
    color: colors.GRAY_400,
    backgroundColor: colors.BACKGROUND,
    borderRadius: 5,
    padding: 10,
  },
});

export default EditScreen;
