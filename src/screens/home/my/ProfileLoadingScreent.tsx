import LoadingView from '@src/components/LoadingView';
import IntroduceView from '@src/components/my/IntroduceView';
import MyHeader from '@src/components/my/MyHeader';
import {colors} from '@src/constants';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface ProfileLoadingScreenProps {
  myKakaoId: number;
  profileKakaoId: number;
}

const ProfileLoadingScreen = ({
  myKakaoId,
  profileKakaoId,
}: ProfileLoadingScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <MyHeader myKakaoid={myKakaoId} profileKakaoId={profileKakaoId} />
      <IntroduceView>
        <LoadingView />
      </IntroduceView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.THEME,
  },
});

export default ProfileLoadingScreen;
