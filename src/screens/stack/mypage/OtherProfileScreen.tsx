import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import { colors } from '@src/constants/colors';
import useAPI from '@src/hooks/useAPI';
import { MyPageScreens, UserProfile } from '@src/types';
import { MainContext } from '@src/utils/Context';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

type Props = NativeStackScreenProps<MyPageScreens, 'OtherProfile'>;

const OtherProfileScreen = ({navigation, route}: Props) => {
  const {getMutation, postMutation} = useAPI();
  const [profile, setProfile] = useState<UserProfile>({
    nickname: '',
    username: -1,
  });

  const {user, token} = useContext(MainContext);

  useEffect(() => {
    const temp: UserProfile = {
      nickname: route.params.props.nickname,
      username: route.params.props.username,
      isMine: false,
    };
    setProfile(temp);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.navigate('Profile');
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          padding: 30,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomButton
          onPress={() => navigation.navigate('Followee')}
          textstyle={{marginBottom: 30}}
          containerstyle={{
            zIndex: 10,
            marginTop: 30,
            width: 'auto',
            height: 'auto',
          }}
          text={'My'}
        />
        <CustomButton
          imageprops={{
            style: {width: 35, height: 35},
            resizeMode: 'cover',
            source: require('@src/assets/buttons/gear.png'),
          }}
        />
      </View>
      {/*-------------------------------------------------*/}

      <Image
        style={{position: 'absolute', left: -35, top: 50, zIndex: 1}}
        resizeMode="center"
        source={require('@src/assets/user/profile.png')}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.body}>
          {/*-------------------------------------------------*/}
          <View style={styles.username}>
            <View>
              <CustomText style={{marginTop: 20}}>
                {profile.nickname}
              </CustomText>
            </View>
            <View style={styles.follow}>
              <CustomText style={{fontSize: 15}}>팔로워</CustomText>
              <View
                style={{borderWidth: 1, height: '50%', borderColor: 'gray'}}
              />
              <CustomButton
                bApplyCommonStyle={false}
                text={'팔로잉'}
                textprops={{style: {fontSize: 15}}}
              />
            </View>
          </View>
          {/*-------------------------------------------------*/}
          <View style={{marginTop: 20}}>
            <CustomText style={{fontSize: 15}}>{profile.introduce}</CustomText>
          </View>
          {/*-------------------------------------------------*/}
          <View style={{borderWidth: 0.5, width: '100%', marginTop: '5%'}} />
        </View>
        {/*-------------------------------------------------*/}
        <View style={{marginTop: 10}}>
          <CustomText>{`참여중인 독서모임`}</CustomText>
        </View>
        <View>
          <ScrollView horizontal={true} style={{marginTop: 10}}></ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.THEME,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  bodyContainer: {
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
  },
  body: {
    marginTop: '10%',
  },
  username: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  follow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export default OtherProfileScreen;
