import {NavigationProp, useNavigation} from '@react-navigation/native';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import Spacer from '@src/components/common/Spacer';
import IntroduceView from '@src/components/my/IntroduceView';
import MyHeader from '@src/components/my/MyHeader';
import {colors} from '@src/constants';
import {MyStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface Props {
  profileKakaoId: number;
  messageText: string;
}

const ProfileErrorScreen = ({profileKakaoId, messageText}: Props) => {
  const {kakaoId} = useContext(MainContext);
  const navigation = useNavigation<NavigationProp<MyStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader myKakaoid={kakaoId!} profileKakaoId={profileKakaoId} />
      <IntroduceView>
        <CustomText style={styles.messageText}>{messageText}</CustomText>
        <Spacer height={50} />
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
      </IntroduceView>
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
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
});
