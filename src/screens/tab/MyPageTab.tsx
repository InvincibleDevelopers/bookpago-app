import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GroupCard from '@src/components/common/card/GroupCard';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import {colors} from '@src/constants/colors';
import {MainContext} from '@src/utils/Context';
import {useContext, useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {MyPageScreens, MainTabs} from '@src/types';
import {
  BottomTabBarButtonProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../stack/mypage/ProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import FollowingScreen from '../stack/mypage/FollowingScreen';
import OtherProfileScreen from '../stack/mypage/OtherProfileScreen';
import SettingScreen from '../stack/mypage/SettingScreen';

type Props = BottomTabScreenProps<MainTabs, 'MyPage'>;
const Stack = createStackNavigator<MyPageScreens>();

const MyPageTab = ({navigation}: Props) => {
  const {user, token} = useContext(MainContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={{headerShown: false}}
        component={ProfileScreen}
      />

      <Stack.Screen
        name="Followee"
        options={{
          title: '팔로잉',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
        }}
        component={FollowingScreen}
      />

      <Stack.Screen
        name="OtherProfile"
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
        }}
        component={OtherProfileScreen}
      />

      <Stack.Screen
        name="Setting"
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
        }}
        component={SettingScreen}
      />
    </Stack.Navigator>
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

export default MyPageTab;
