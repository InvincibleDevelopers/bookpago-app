import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GroupCard from '@src/components/GroupCard';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import {colors} from '@src/constants/colors';
import {MainContext} from '@src/utils/Context';
import {useContext, useEffect, useMemo, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {MyPageScreens, UserProfile} from '@src/types';
import useOnStart from '@src/hooks/useOnStart';
import axios from 'axios';
import {DOMAIN} from '@env';
import useAPI from '@src/hooks/useAPI';
import {useFocusEffect} from '@react-navigation/native';
import RecentBook from '@src/components/RecentBook';

type Props = NativeStackScreenProps<MyPageScreens, 'Profile'>;

const ProfileScreen = ({navigation, route}: Props) => {
  const {getMutation, postMutation} = useAPI();
  const [profile, setProfile] = useState<UserProfile>({
    nickname: '',
    username: -1,
  });

  const {user, setUser, token} = useContext(MainContext);

  useOnStart(() => {
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        horizontal={false}
        style={{flex: 1}}
        contentContainerStyle={styles.container}>
        <View
          style={{
            padding: 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CustomButton
            textstyle={{marginBottom: 30}}
            containerstyle={{
              zIndex: 10,
              marginTop: 30,
              width: 'auto',
              height: 'auto',
            }}
            text={'MY'}
          />
          <CustomButton
            onPress={() => navigation.navigate('Setting')}
            imageprops={{
              style: {width: 35, height: 35},
              resizeMode: 'cover',
              source: require('@src/assets/buttons/gear.png'),
            }}
          />
        </View>
        {/*-------------------------------------------------*/}

        <Image
          style={{position: 'absolute', width: 50, height: 50, left: 20, top: 150, zIndex: 1}}
          resizeMode="center"
          source={{uri: `${user.image}`}}
        />
        <View style={styles.bodyContainer}>
          <View style={styles.body}>
            {/*-------------------------------------------------*/}
            <View style={styles.username}>
              <View>
                <CustomText style={{marginTop: 20}}>{user.nickname}</CustomText>
              </View>
              <View style={styles.follow}>
                <CustomText style={{fontSize: 15}}>팔로워</CustomText>
                <View
                  style={{borderWidth: 1, height: '50%', borderColor: 'gray'}}
                />
                <CustomButton
                  onPress={() => navigation.navigate('Followee')}
                  bApplyCommonStyle={false}
                  text={'팔로잉'}
                  textprops={{style: {fontSize: 15}}}
                />
              </View>
            </View>
            {/*-------------------------------------------------*/}
            <View style={{marginTop: 20}}>
              <CustomText style={{fontSize: 15}}>{user.introduce}</CustomText>
            </View>
            {/*-------------------------------------------------*/}
            <View style={{borderWidth: 0.5, width: '100%', marginTop: '5%'}} />
          </View>
          {/*-------------------------------------------------*/}
          <View style={{marginTop: 10}}>
            <CustomText>{`참여중인 독서모임`}</CustomText>
          </View>
          <View>
            <ScrollView horizontal={true} style={{marginTop: 10}}>
              <GroupCard members={5} clubName="Hello" time={"투썸 앞 14:00"} location={"서울대학교"}/>
            </ScrollView>
          </View>
          <View style={{marginTop: "10%"}}>
            <RecentBook path={"https://front-umber-omega.vercel.app/_next/image?url=%2Fimage.jpg&w=1080&q=75"} title={"해리포터: 죽음의 성물과 아즈카반의 죄수 뭐시기들"} detail={"Rowling, J.K 저자"}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.THEME,
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

export default ProfileScreen;
