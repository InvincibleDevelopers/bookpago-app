import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getProfile} from '@src/api/profile';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import LoadingView from '@src/components/LoadingView';
import Divider from '@src/components/common/Divider';
import Spacer from '@src/components/common/Spacer';
import ClubCard from '@src/components/common/card/ClubCard';
import MyHeader from '@src/components/my/MyHeader';
import ParticipateClubModal from '@src/components/my/ParticipateClubModal';
import SectionButton from '@src/components/my/SectionButton';
import {colors} from '@src/constants/colors';
import {
  HomeTabParamList,
  MyStackParamList,
  RootStackParamList,
} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useQuery} from '@tanstack/react-query';
import {useContext, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProfileErrorScreen from './ProfileErrorScreen';

type Props = NativeStackScreenProps<MyStackParamList, 'Profile'>;

const ProfileScreen = ({navigation, route}: Props) => {
  const profileKakaoId = route.params.kakaoId;

  const tabNav = navigation.getParent<NavigationProp<HomeTabParamList>>();
  const rootNav = navigation.getParent<NavigationProp<RootStackParamList>>();
  const {kakaoId: myKakaoId} = useContext(MainContext);
  const isMyProfile = profileKakaoId === myKakaoId;

  const [isShowParticipateModal, setIsShowParticipateModal] = useState(false);

  const profileQuery = useQuery({
    queryKey: ['/profile/:kakaoId', profileKakaoId],
    queryFn: async () =>
      getProfile({
        myKakaoId: myKakaoId!,
        currentUserKakaoId: profileKakaoId,
      }),
    enabled: !!myKakaoId,
  });

  const openParticipateModal = () => setIsShowParticipateModal(true);
  const closeParticipateModal = () => setIsShowParticipateModal(false);

  const navigateClubDetail = (socialGrop: SocialClub) => {
    navigation.navigate('ClubDetail', {socialGrop});
  };

  const pressModalRow = (club: SocialClub) => {
    closeParticipateModal();
    navigateClubDetail(club);
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
      <SafeAreaView style={[styles.container, {backgroundColor: colors.THEME}]}>
        <MyHeader myKakaoid={myKakaoId!} profileKakaoId={profileKakaoId} />
        <View style={styles.bodyContainer}>
          <View style={styles.bodyInnerBox}>
            <LoadingView />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <MyHeader myKakaoid={myKakaoId!} profileKakaoId={profileKakaoId} />
          <View style={styles.bodyContainer}>
            <View style={styles.bodyInnerBox}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={require('@src/assets/user/profile.png')}
              />

              <View style={styles.header}>
                <Pressable style={styles.dmButton} onPress={() => {}}>
                  <Text style={{color: colors.THEME, fontSize: 16}}>
                    팔로우/언팔
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.dmButton}
                  onPress={() => rootNav.navigate('Chat')}>
                  <Text style={{color: colors.THEME, fontSize: 16}}>
                    DM 보내기
                  </Text>
                </Pressable>
              </View>

              <Spacer height={20} />

              <View style={styles.infoBox}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    style={{
                      fontSize: 20,
                      flex: 1,
                    }}
                    numberOfLines={1}>
                    {profileQuery.data.profile.nickname}
                  </CustomText>
                  <Pressable onPress={() => navigation.navigate('Edit')}>
                    <Image
                      source={require('@src/assets/icons/edit.png')}
                      style={{width: 18, height: 18, marginRight: 10}}
                    />
                  </Pressable>
                </View>
                <View style={styles.follow}>
                  <CustomButton
                    onPress={() => navigation.navigate('Follower')}
                    bApplyCommonStyle={false}
                    text="팔로워"
                    textprops={{style: {fontSize: 15, color: colors.GRAY_400}}}
                  />
                  <Divider type="vertical" style={{height: 15}} />
                  <CustomButton
                    onPress={() => navigation.navigate('Followee')}
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
            </View>
          </View>

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
  headerBox: {
    backgroundColor: colors.THEME,
  },
  bodyContainer: {
    backgroundColor: colors.THEME,
    flex: 1,
  },
  bodyInnerBox: {
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  image: {
    position: 'absolute',
    top: -50,
    left: 20,
    width: 100,
    height: 100,
  },
  header: {
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
