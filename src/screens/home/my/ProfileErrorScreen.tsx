import {NavigationProp, useNavigation} from '@react-navigation/native';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import MyBackHeader from '@src/components/my/MyBackHeader';
import MyHeader from '@src/components/my/MyHeader';
import {colors} from '@src/constants';
import {MyStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

interface Props {
  profileKakaoId: number;
  messageText: string;
}

const ProfileErrorScreen = ({profileKakaoId, messageText}: Props) => {
  const {kakaoId} = useContext(MainContext);
  const navigation = useNavigation<NavigationProp<MyStackParamList>>();

  const isMyProfile = profileKakaoId == kakaoId;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        {isMyProfile ? (
          <MyHeader myKakaoid={kakaoId!} profileKakaoId={profileKakaoId} />
        ) : (
          <MyBackHeader />
        )}
      </View>
      <View style={styles.bodyBox}>
        <View style={styles.innerBox}>
          <CustomText style={styles.messageText}>{messageText}</CustomText>
          <CustomButton
            bApplyCommonStyle={true}
            containerstyle={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 3,
            }}
            text="뒤로가기"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    backgroundColor: colors.THEME,
  },
  bodyBox: {
    flex: 1,
    backgroundColor: colors.THEME,
  },
  innerBox: {
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: colors.WHITE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
});
