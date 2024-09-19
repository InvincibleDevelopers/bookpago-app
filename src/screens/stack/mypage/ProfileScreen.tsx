import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GroupCard from '@src/components/GroupCard';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import {colors} from '@src/constants/colors';
import {MainContext} from '@src/utils/Context';
import {useContext, useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { MyPageScreens } from '@src/types';
import useOnStart from '@src/hooks/useOnStart';
import axios from 'axios';
import { DOMAIN } from '@env';

type Props = NativeStackScreenProps<MyPageScreens, 'Profile'>;

const ProfileScreen = ({navigation, route}: Props) => {
  const {user, token} = useContext(MainContext);
  let userId = user.nickname;
  if(route.params){
    userId = route.params.userId;
  }
  

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
              <CustomText style={{marginTop: 20}}>{user.nickname}</CustomText>
            </View>
            <View style={styles.follow}>
              <CustomText style={{fontSize: 15}}>팔로워</CustomText>
              <View
                style={{borderWidth: 1, height: '50%', borderColor: 'gray'}}
              />
              <CustomButton onPress={()=>navigation.navigate("Followee")} bApplyCommonStyle={false} text={"팔로잉"} textprops={{style: {fontSize: 15}}} />
            </View>
          </View>
          {/*-------------------------------------------------*/}
          <View style={{marginTop: 20}}>
            <CustomText style={{fontSize: 15}}>
               {user.introduce}
            </CustomText>
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
            
          </ScrollView>
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

export default ProfileScreen;
