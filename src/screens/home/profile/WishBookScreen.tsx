import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import Divider from '@src/components/common/Divider';
import Spacer from '@src/components/common/Spacer';
import BookCard from '@src/components/common/card/BookCard';
import IntroduceView from '@src/components/profile/IntroduceView';
import MyHeader from '@src/components/profile/MyHeader';
import NicknameButton from '@src/components/profile/Nickname';
import ProfileImageButton from '@src/components/profile/ProfileImageButton';
import SectionButton from '@src/components/profile/SectionButton';
import {colors} from '@src/constants/colors';
import useProfile from '@src/hooks/useProfile';
import useUploadProfileImage from '@src/hooks/useUploadProfileImage';
import {BookItem, MyStackParamList, RootStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import React, {useCallback, useContext, useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProfileErrorScreen from './ProfileErrorScreen';
import ProfileLoadingScreen from './ProfileLoadingScreent';

type Props = NativeStackScreenProps<MyStackParamList, 'WishBook'>;

const WishBookScreen = ({navigation, route}: Props) => {
  const rootNav = navigation.getParent<NavigationProp<RootStackParamList>>();
  const {kakaoId: myKakaoId} = useContext(MainContext);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const profileQuery = useProfile(myKakaoId, myKakaoId!);
  const mutateProfileImage = useUploadProfileImage(myKakaoId);

  const onRefresh = async () => {
    setIsRefreshing(() => true);
    await profileQuery.refetch();
    setIsRefreshing(() => false);
  };

  const longPressProfileImage = () => {
    if (mutateProfileImage.isPending) return;
    Alert.alert('프로필 사진을 변경하시겠습니까?', undefined, [
      {text: '취소', style: 'cancel'},
      {
        text: '변경',
        onPress: () => {
          mutateProfileImage.mutate(myKakaoId!);
        },
      },
    ]);
  };

  const renderItem = useCallback(({item}: {item: BookItem}) => {
    return (
      <View>
        <BookCard
          isbn={item.isbn}
          image={item.image}
          title={item.title}
          author={item.author}
          style={{flex: 1}}
          onPress={() => navigation.navigate('BookDetail', {isbn: item.isbn})}
        />
        <Spacer height={20} />
      </View>
    );
  }, []);

  if (profileQuery.error) {
    const error = profileQuery.error as unknown as {error: string};
    return (
      <ProfileErrorScreen
        profileKakaoId={myKakaoId!}
        messageText={error.error}
      />
    );
  }

  if (profileQuery.isPending) {
    return (
      <ProfileLoadingScreen
        myKakaoId={myKakaoId!}
        profileKakaoId={myKakaoId!}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <MyHeader
              myKakaoid={myKakaoId!}
              profileKakaoId={myKakaoId!}
              isShowBackButton
            />

            <IntroduceView>
              <View style={styles.inner}>
                <ProfileImageButton
                  onLongPress={longPressProfileImage}
                  imageUri={profileQuery.data.profile.imageUrl}
                />

                <View style={styles.followBox}>
                  <Pressable
                    style={styles.dmButton}
                    onPress={() => rootNav.navigate('DM')}>
                    <Text style={{color: colors.THEME, fontSize: 16}}>
                      메세지
                    </Text>
                  </Pressable>
                </View>

                <Spacer height={20} />

                <View style={styles.infoBox}>
                  <NicknameButton
                    nickname={profileQuery.data.profile.nickname}
                    onPress={() => navigation.navigate('Edit')}
                    editable
                  />

                  <View style={styles.follow}>
                    <CustomButton
                      onPress={() =>
                        navigation.navigate('Follower', {kakaoId: myKakaoId!})
                      }
                      bApplyCommonStyle={false}
                      text="팔로워"
                      textprops={{
                        style: {fontSize: 15, color: colors.GRAY_400},
                      }}
                    />
                    <Divider type="vertical" style={{height: 15}} />
                    <CustomButton
                      onPress={() =>
                        navigation.navigate('Following', {
                          kakaoId: myKakaoId!,
                        })
                      }
                      bApplyCommonStyle={false}
                      text="팔로잉"
                      textprops={{
                        style: {fontSize: 15, color: colors.GRAY_400},
                      }}
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
              </View>
            </IntroduceView>

            <Spacer height={5} />

            <View
              style={{backgroundColor: colors.WHITE, paddingHorizontal: 20}}>
              <Spacer height={20} />
              <SectionButton disabled>찜한 책들</SectionButton>
              <Spacer height={20} />
            </View>
            <Spacer height={20} />
          </>
        }
        columnWrapperStyle={styles.columnWrapper}
        numColumns={3}
        data={profileQuery.data.profile.wishBookDto}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 20,
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
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 20,
  },
});

export default WishBookScreen;
