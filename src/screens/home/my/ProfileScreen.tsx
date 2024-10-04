import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import RecentBook from '@src/components/RecentBook';
import Divider from '@src/components/common/Divider';
import Spacer from '@src/components/common/Spacer';
import ClubCard from '@src/components/common/card/ClubCard';
import {colors} from '@src/constants/colors';
import {
  HomeTabParamList,
  MyStackParamList,
  RootStackParamList,
  UserProfile,
} from '@src/types';
import {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<MyStackParamList, 'Profile'>;

const ProfileScreen = ({navigation, route}: Props) => {
  const tabNav = navigation.getParent<NavigationProp<HomeTabParamList>>();
  const rootNav = navigation.getParent<NavigationProp<RootStackParamList>>();

  const [profile, setProfile] = useState<UserProfile>({
    nickname: '',
    username: '',
    image: '',
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        horizontal={false}
        contentContainerStyle={styles.container}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginBottom: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CustomButton hitSlop={10} text="MY" />
          <CustomButton
            hitSlop={10}
            onPress={() => navigation.navigate('Setting')}
            imageprops={{
              style: {width: 35, height: 35},
              resizeMode: 'cover',
              source: require('@src/assets/buttons/gear.png'),
            }}
          />
        </View>
        {/*-------------------------------------------------*/}

        <View style={styles.bodyContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('@src/assets/user/profile.png')}
          />
          <View style={styles.header}>
            <Pressable
              style={styles.dmButton}
              onPress={() => {
                rootNav.navigate('Chat');
              }}>
              <Text style={{color: colors.THEME, fontSize: 16}}>DM 보내기</Text>
            </Pressable>
          </View>
          <View style={styles.body}>
            {/*-------------------------------------------------*/}
            <View style={styles.infoBox}>
              <View>
                <CustomText style={{marginTop: 20}}>
                  {profile.nickname}
                </CustomText>
              </View>
              <View style={styles.follow}>
                <CustomText style={{fontSize: 15}}>팔로워</CustomText>
                <Divider type="vertical" style={{height: 15}} />
                <CustomButton
                  onPress={() => navigation.navigate('Followee')}
                  bApplyCommonStyle={false}
                  text={'팔로잉'}
                  textprops={{style: {fontSize: 15}}}
                />
              </View>
            </View>
            <Spacer height={20} />
            <CustomText style={{fontSize: 15}}>{profile.introduce}</CustomText>
          </View>
          <Divider type="horizontal" />
          <Spacer height={20} />
          <CustomText>{`참여중인 독서모임`}</CustomText>
          <View>
            <ScrollView horizontal={true} style={{marginTop: 10}}>
              {/* <ClubCard
                members={5}
                clubName="Hello"
                meetingTime={new Date()}
                description="asdasdasdasd"
                location={'서울대학교'}
              /> */}
            </ScrollView>
          </View>
          <ScrollView
            horizontal={true}
            style={{marginTop: '10%'}}
            contentContainerStyle={{gap: 20}}>
            <RecentBook
              path={
                'https://front-umber-omega.vercel.app/_next/image?url=%2Fimage.jpg&w=1080&q=75'
              }
              title={'해리포터: 죽음의 성물과 아즈카반의 죄수 뭐시기들'}
              detail={'Rowling, J.K 저자'}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.THEME,
  },
  bodyContainer: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
  },
  image: {
    position: 'absolute',
    top: -50,
    left: 20,
    width: 100,
    height: 100,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  body: {},
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  follow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  dmButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.GRAY,
    borderRadius: 9999,
  },
});

export default ProfileScreen;
