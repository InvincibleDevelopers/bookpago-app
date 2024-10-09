import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as TabIcon from '@src/components/HomeTabIcons';
import MyNavigator from '@src/navigators/home/MyNavigator';
import SearchNavigator from '@src/navigators/home/SearchNavigator';
import SocialNavigator from '@src/navigators/home/SocialNavigator';
import {HomeTabParamList} from '@src/types';
import {StyleSheet} from 'react-native';
import MainNavigator from './MainNavigator';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.container,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        options={{
          title: '홈 화면',
          tabBarIcon: TabIcon.HomeIcon,
        }}
        component={MainNavigator}
      />
      <Tab.Screen
        name="Search"
        options={{
          title: '책 검색',
          tabBarIcon: TabIcon.SearchIcon,
        }}
        component={SearchNavigator}
      />
      <Tab.Screen
        name="Social"
        options={{
          title: '독서 모임',
          tabBarIcon: TabIcon.SocialIcon,
        }}
        component={SocialNavigator}
      />
      {/* <Tab.Screen
        name="Calendar"
        options={{
          title: '캘린더',
          tabBarIcon: TabIcon.CalendarIcon,
        }}
        component={CalendarNavigator}
      /> */}
      <Tab.Screen
        name="My"
        options={{
          title: '마이페이지',
          tabBarIcon: TabIcon.MyPageIcon,
        }}
        component={MyNavigator}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    height: 80,
  },
});
