import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '@src/constants/colors';
import {HomeTabParamList, MyStackParamList} from '@src/types';
import {StyleSheet} from 'react-native';
import FollowingScreen from '../../screens/home/my/FollowingScreen';
import OtherProfileScreen from '../../screens/home/my/OtherProfileScreen';
import ProfileScreen from '../../screens/home/my/ProfileScreen';
import SettingScreen from '../../screens/home/my/SettingScreen';

type Props = BottomTabScreenProps<HomeTabParamList, 'My'>;
const Stack = createStackNavigator<MyStackParamList>();

const MyNavigator = ({navigation}: Props) => {
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

export default MyNavigator;
