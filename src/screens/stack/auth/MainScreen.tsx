import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import {colors} from '@src/constants/colors';
import useAPI from '@src/hooks/useAPI';
import useOnStart from '@src/hooks/useOnStart';
import {AuthScreens} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext} from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

type Props = NativeStackScreenProps<AuthScreens, 'Main'>;

const MainScreen = ({navigation}: Props) => {
  const {isLoading, kakaoId} = useContext(MainContext);
  const {getMutation} = useAPI();

  useOnStart(async () => {
    // const username = await EncryptedStorage.getItem("username");
    // if(!username) {
    //     return;
    // }
    // getMutation.mutate({path: `/user/login?username=${username}`}, {
    //     onSuccess: (res) => {
    //         setUser({
    //             username: Number(username),
    //             nickname: res.nickname,
    //             image: res.imageUrl,
    //         });
    //         setLogin(true);
    //     },
    // });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{width: 105.45, height: 113.45}}
        source={require('@src/assets/logo/logo.png')}
      />
      <Image
        style={{width: 177.21, height: 56.22, marginTop: 20}}
        source={require('@src/assets/logo/title.png')}
      />
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
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    top: '70%',
    width: 352,
    height: 56,
  },
});

export default MainScreen;
