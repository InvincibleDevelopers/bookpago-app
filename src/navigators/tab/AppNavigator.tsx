import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from '@src/screens/tab/HomeTab';
import {MainTabs} from '@src/types';
import MyPageTab from '@src/screens/tab/MyPageTab';
import SearchTab from '@src/screens/tab/SearchTab';
import SocialTab from '@src/screens/tab/SocialTab';
import CalendarTab from '@src/screens/tab/CalendarTab';
import {Image} from 'react-native';
import { useContext } from 'react';
import { MainContext } from '@src/utils/Context';

const Tab = createBottomTabNavigator<MainTabs>();

const HomeIcon = ({focused}: {focused: boolean}) => {
  return (
    <Image
      style={{width: 40, height: 40}}
      resizeMode="center"
      source={
        focused
          ? require('@src/assets/icons/home.png')
          : require('@src/assets/icons/nhome.png')
      }
    />
  );
};

const SearchIcon = ({focused}: {focused: boolean}) => {
  return (
    <Image
      style={{width: 40, height: 40}}
      resizeMode="center"
      source={
        focused
          ? require('@src/assets/icons/search.png')
          : require('@src/assets/icons/nsearch.png')
      }
    />
  );
};

const SocialIcon = ({focused}: {focused: boolean}) => {
  return (
    <Image
      style={{width: 40, height: 40}}
      resizeMode="center"
      source={
        focused
          ? require('@src/assets/icons/social.png')
          : require('@src/assets/icons/nsocial.png')
      }
    />
  );
};

const CalendarIcon = ({focused}: {focused: boolean}) => {
  return (
    <Image
      style={{width: 40, height: 40}}
      resizeMode="cover"
      source={
        focused
          ? require('@src/assets/icons/cal.png')
          : require('@src/assets/icons/ncal.png')
      }
    />
  );
};

const MyPageIcon = ({focused}: {focused: boolean}) => {

  return (
    <Image
      style={{width: 50, height: 50}}
      resizeMode="center"
      source={
        focused
          ? require('@src/assets/icons/my.png')
          : require('@src/assets/icons/nmy.png')
      }
    />
  );
};

const AppNavigator = () => {

  const {isTabVisible} = useContext(MainContext);

  const visible: BottomTabNavigationOptions = {
    headerShown: false,
        tabBarStyle: {
          top: 0,
          height: "11%",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        },
  };

  const invisible: BottomTabNavigationOptions = {
    headerShown: false,
        tabBarStyle: {
          top: 10,
          height: 0,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        },
  };


  return (
    <Tab.Navigator
      screenOptions={
        isTabVisible ? visible : invisible
      }
      
      >
      <Tab.Screen
        name="Home"
        options={{
          title: '',
          tabBarIconStyle: {top: 8},
          tabBarIcon: HomeIcon,
        }}
        component={HomeTab}
      />
      <Tab.Screen
        name="Search"
        options={{
          title: '',
          tabBarIconStyle: {top: 8},
          tabBarIcon: SearchIcon,
        }}
        component={SearchTab}
      />
      <Tab.Screen
        name="Social"
        options={{
          title: '',
          tabBarIconStyle: {top: 8},
          tabBarIcon: SocialIcon,
        }}
        component={SocialTab}
      />
      <Tab.Screen
        name="Calendar"
        options={{
          title: '',
          tabBarIconStyle: {top: 8},
          tabBarIcon: CalendarIcon,
        }}
        component={CalendarTab}
      />
      <Tab.Screen
        name="MyPage"
        options={{
          title: '',
          tabBarIconStyle: {top: 8},
          tabBarIcon: MyPageIcon,
        }}
        component={MyPageTab}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
