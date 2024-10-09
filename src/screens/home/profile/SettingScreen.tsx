import {DOMAIN} from '@env';
import {patchProfileImage} from '@src/api/profile';
import CustomButton from '@src/components/CustomButton';
import InputField from '@src/components/InputField';
import Spacer from '@src/components/common/Spacer';
import IntroduceView from '@src/components/profile/IntroduceView';
import MyBackHeader from '@src/components/profile/MyBackHeader';
import MyHeader from '@src/components/profile/MyHeader';
import {colors} from '@src/constants';
import {UserProfile} from '@src/types';
import {MainContext} from '@src/utils/Context';
import axios from 'axios';
import {useContext, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

const SettingScreen = () => {
  const {logout, kakaoId} = useContext(MainContext);

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader
        myKakaoid={kakaoId!}
        profileKakaoId={kakaoId!}
        isShowBackButton
      />
      <ScrollView>
        <IntroduceView>
          <Spacer height={50} />
          <View style={styles.rowBox}>
            <Image
              source={require('@src/assets/icons/logout.png')}
              style={styles.rowImage}
            />
            <Text></Text>
          </View>
        </IntroduceView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowBox: {
    backgroundColor: colors.WHITE,
    // borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: 1,
  },
  rowImage: {
    width: 20,
    height: 20,
    marginRight: 25,
  },
  rowText: {
    color: colors.BLACK,
    fontSize: 17,
  },
});

export default SettingScreen;
