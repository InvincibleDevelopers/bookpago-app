import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {postKakaoJoin} from '@src/api/auth';
import DismissKeyboardView from '@src/components/common/DismissKeyboardView';
import Spacer from '@src/components/common/Spacer';
import {colors} from '@src/constants/colors';
import {AuthStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useMutation} from '@tanstack/react-query';
import {useContext, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

type Props = NativeStackScreenProps<AuthStackParamList, 'Join'>;

const data = [
  {
    key: 'M',
    label: '남자',
  },
  {
    key: 'F',
    label: '여자',
  },
];

const JoinScreen = ({navigation, route}: Props) => {
  const props = route.params;
  const ctx = useContext(MainContext);

  const genderRef = useRef<ModalSelector<{key: string; label: string}>>(null);
  const ageRef = useRef<TextInput>(null);
  const genreRef = useRef<TextInput>(null);
  const introduceRef = useRef<TextInput>(null);

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<'M' | 'F' | null>(null);
  const [genre, setGenre] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [age, setAge] = useState('');

  const mutateJoin = useMutation({
    mutationFn: postKakaoJoin,
    onSuccess: () => ctx.login({kakaoId: props.kakaoId}),
    onError: () => {
      Alert.alert('회원가입에 실패했습니다.', '잠시후 다시시도 해주세요.');
      navigation.navigate('AuthMain');
    },
  });

  const onChangeAge = (text: string) => {
    setAge(text.replace(/[^0-9]/g, ''));
  };

  const onSelect = (option: {key: string; label: string}) => {
    const key = option.key;
    if (key === 'M' || key === 'F') {
      setGender(() => key);
      genreRef.current?.focus();
    }
  };

  const onPress = () => {
    if (mutateJoin.isPending) {
      return;
    }

    const numAge = Number(age);

    if (!gender) {
      Alert.alert('성별을 선택해주세요');
      return;
    }

    if (!numAge) {
      Alert.alert('나이를 입력해주세요');
      return;
    }

    mutateJoin.mutate({
      nickname: nickname.trim(),
      gender,
      genre: genre.trim(),
      introduce: introduce.trim(),
      kakaoOauthToken: props.kakaoOauthToken,
      age: Number(age) || 0,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView style={{flex: 1}}>
        <View style={styles.inner}>
          <View>
            <Text style={styles.title}>회원님만의</Text>
            <Text style={styles.title}>
              <Text style={styles.titleAccent}>계정</Text>을 만들어주세요.
            </Text>
            <Spacer height={60} />
          </View>

          <Text style={styles.label}>닉네임</Text>
          <Spacer height={12} />
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            // onSubmitEditing={() => genderRef.current?.open()}
            placeholderTextColor={colors.GRAY_300}
            placeholder="닉네임을 입력해주세요."
            returnKeyType="next"
          />

          <Spacer height={24} />

          <Text style={styles.label}>성별</Text>
          <Spacer height={12} />
          <ModalSelector
            ref={genderRef}
            overlayStyle={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
            keyExtractor={item => item.key}
            data={data}
            accessible
            onChange={onSelect}
            labelExtractor={item => item.label}
            optionContainerStyle={{backgroundColor: colors.WHITE}}
            cancelStyle={{backgroundColor: colors.WHITE}}
            cancelText="취소">
            <View style={[styles.input, {justifyContent: 'center'}]}>
              <Text
                style={{color: gender ? styles.input.color : colors.GRAY_300}}>
                {!gender
                  ? '성별을 선택해주세요.'
                  : gender === 'M'
                  ? '남자'
                  : '여자'}
              </Text>
            </View>
          </ModalSelector>

          <Spacer height={24} />

          <Text style={styles.label}>나이</Text>
          <Spacer height={12} />
          <TextInput
            ref={ageRef}
            style={styles.input}
            keyboardType="number-pad"
            placeholder="나이를 입력해주세요."
            placeholderTextColor={colors.GRAY_300}
            returnKeyType="next"
            value={age}
            onChangeText={onChangeAge}
            onSubmitEditing={() => genreRef.current?.focus()}
          />

          <Spacer height={24} />

          <Text style={styles.label}>장르</Text>
          <Spacer height={12} />
          <TextInput
            ref={genreRef}
            style={styles.input}
            value={genre}
            placeholder="선호하는 장르를 입력해주세요."
            placeholderTextColor={colors.GRAY_300}
            onChangeText={setGenre}
            onSubmitEditing={() => introduceRef.current?.focus()}
            returnKeyType="next"
          />

          <Spacer height={24} />

          <Text style={styles.label}>자기소개</Text>
          <Spacer height={12} />
          <TextInput
            ref={introduceRef}
            style={[styles.input, {justifyContent: 'flex-start'}]}
            value={introduce}
            onChangeText={setIntroduce}
            placeholder={'자기소개를 입력해주세요.'}
            placeholderTextColor={colors.GRAY_300}
            returnKeyType="send"
            numberOfLines={5}
            textAlignVertical="top" //android only
            multiline
          />

          <Spacer height={60} />

          <Pressable
            onPress={onPress}
            style={styles.button}
            disabled={mutateJoin.isPending}>
            <Text style={styles.buttonText}>가입하기</Text>
          </Pressable>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  inner: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  titleAccent: {
    color: colors.THEME,
  },
  label: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.GRAY,
    borderRadius: 5,
    paddingHorizontal: 15,
    minHeight: 48,
    color: colors.BLACK,
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

  button: {
    backgroundColor: colors.THEME,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default JoinScreen;
