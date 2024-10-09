import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import LoadingView from '@src/components/LoadingView';
import Divider from '@src/components/common/Divider';
import Spacer from '@src/components/common/Spacer';
import ClubCard from '@src/components/common/card/ClubCard';
import IntroduceView from '@src/components/profile/IntroduceView';
import MyHeader from '@src/components/profile/MyHeader';
import ParticipateClubModal from '@src/components/profile/ParticipateClubModal';
import ProfileImageButton from '@src/components/profile/ProfileImageButton';
import SectionButton from '@src/components/profile/SectionButton';
import {colors} from '@src/constants/colors';
import useProfile from '@src/hooks/useProfile';
import useUploadProfileImage from '@src/hooks/useUploadProfileImage';
import {
  HomeTabParamList,
  MyStackParamList,
  RootStackParamList,
} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useQueryClient} from '@tanstack/react-query';
import {useContext, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NicknameButton from '@src/components/profile/Nickname';
import ProfileErrorScreen from './ProfileErrorScreen';
import ProfileLoadingScreen from './ProfileLoadingScreent';

type Props = NativeStackScreenProps<MyStackParamList, 'Profile'>;

const ProfileScreen = ({navigation, route}: Props) => {
  const profileKakaoId = route.params.kakaoId;

  const tabNav = navigation.getParent<NavigationProp<HomeTabParamList>>();
  const rootNav = navigation.getParent<NavigationProp<RootStackParamList>>();
  const {kakaoId: myKakaoId} = useContext(MainContext);
  const isMyProfile = profileKakaoId === myKakaoId;

  const [isShowParticipateModal, setIsShowParticipateModal] = useState(false);

  const queryClient = useQueryClient();
  const profileQuery = useProfile(myKakaoId!, profileKakaoId);
  const mutateProfileImage = useUploadProfileImage(myKakaoId!);

  const openParticipateModal = () => setIsShowParticipateModal(true);
  const closeParticipateModal = () => setIsShowParticipateModal(false);

  const navigateClubDetail = (socialGrop: SocialClub) => {
    navigation.navigate('ClubDetail', {socialGrop});
  };

  const pressModalRow = (club: SocialClub) => {
    closeParticipateModal();
    navigateClubDetail(club);
  };

  const longPressProfileImage = () => {
    if (mutateProfileImage.isPending) return;
    Alert.alert('프로필 사진을 변경하시겠습니까?', undefined, [
      {text: '취소', style: 'cancel'},
      {
        text: '변경',
        onPress: () => {
          mutateProfileImage.mutate(profileKakaoId);
        },
      },
    ]);
  };

  if (profileQuery.error) {
    const error = profileQuery.error as unknown as {error: string};
    return (
      <ProfileErrorScreen
        profileKakaoId={profileKakaoId}
        messageText={error.error}
      />
    );
  }

  if (profileQuery.isPending) {
    return (
      <ProfileLoadingScreen
        myKakaoId={myKakaoId!}
        profileKakaoId={profileKakaoId}
      />
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <MyHeader myKakaoid={myKakaoId!} profileKakaoId={profileKakaoId} />

          <IntroduceView>
            <ProfileImageButton
              onLongPress={longPressProfileImage}
              disabled={!isMyProfile}
              imageUri={profileQuery.data.profile.imageUrl}
            />

            <View style={styles.followBox}>
              {isMyProfile ? (
                <Pressable
                  style={styles.dmButton}
                  onPress={() => rootNav.navigate('DM')}>
                  <Text style={{color: colors.THEME, fontSize: 16}}>
                    DM 보내기
                  </Text>
                </Pressable>
              ) : (
                <Pressable style={styles.dmButton} onPress={() => {}}>
                  <Text style={{color: colors.THEME, fontSize: 16}}>
                    팔로우/언팔
                  </Text>
                </Pressable>
              )}
            </View>

            <Spacer height={20} />

            <View style={styles.infoBox}>
              <NicknameButton
                nickname={profileQuery.data.profile.nickname}
                onPress={() => navigation.navigate('Edit')}
                editable={isMyProfile}
              />

              <View style={styles.follow}>
                <CustomButton
                  onPress={() => navigation.navigate('Follower')}
                  bApplyCommonStyle={false}
                  text="팔로워"
                  textprops={{style: {fontSize: 15, color: colors.GRAY_400}}}
                />
                <Divider type="vertical" style={{height: 15}} />
                <CustomButton
                  onPress={() => navigation.navigate('Following')}
                  bApplyCommonStyle={false}
                  text="팔로잉"
                  textprops={{style: {fontSize: 15, color: colors.GRAY_400}}}
                />
              </View>
            </View>

            <Spacer height={20} />

            <CustomText
              style={{
                fontSize: 15,
                color: colors.GRAY_400,
                fontWeight: 'medium',
              }}>
              {profileQuery.data.profile.introduce === ''
                ? '소개글을 입력해 주세요'
                : profileQuery.data.profile.introduce}
            </CustomText>

            <Spacer height={20} />

            <Divider type="horizontal" />

            <Spacer height={20} />

            <SectionButton onPress={openParticipateModal}>
              참여중인 독서모임
            </SectionButton>

            <Spacer height={20} />

            <ScrollView
              horizontal
              contentContainerStyle={{gap: 20}}
              showsHorizontalScrollIndicator={false}>
              {profileQuery.data.profile.readingClubDto.content
                .slice(0, 6)
                .map((club, index) => (
                  <ClubCard
                    data={club}
                    key={`participate_${club.id}_${index}`}
                    onPress={() => navigateClubDetail(club)}
                  />
                ))}
            </ScrollView>
          </IntroduceView>

          <Spacer height={5} />

          <View style={{backgroundColor: colors.WHITE, padding: 20}}>
            <SectionButton onPress={openParticipateModal}>
              찜 목록
            </SectionButton>
            <ScrollView
              horizontal
              contentContainerStyle={{gap: 20}}
              showsHorizontalScrollIndicator={false}></ScrollView>
          </View>

          <Spacer height={50} backgroundColor={colors.WHITE} />

          <Spacer height={50} backgroundColor={colors.WHITE} />

          <Spacer height={50} backgroundColor={colors.WHITE} />
        </ScrollView>
      </SafeAreaView>

      <ParticipateClubModal
        clubList={profileQuery.data.profile.readingClubDto.content}
        isShow={isShowParticipateModal}
        onClose={closeParticipateModal}
        onPressRow={pressModalRow}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  followBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  follow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dmButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.GRAY,
    borderRadius: 9999,
  },
});

export default ProfileScreen;
