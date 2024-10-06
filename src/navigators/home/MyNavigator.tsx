import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabParamList, MyStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext} from 'react';
import FollowerScreen from '@src/screens/home/my/FollowerScreen';
import ProfileScreen from '@src/screens/home/my/ProfileScreen';
import SettingScreen from '@src/screens/home/my/SettingScreen';
import EditScreen from '@src/screens/home/my/EditScreen';
import ClubDetailScreen from '@src/screens/home/ClubDetailScreen';
import FollowingScreen from '@src/screens/home/my/FollowingScreen';

type Props = BottomTabScreenProps<HomeTabParamList, 'My'>;
const Stack = createStackNavigator<MyStackParamList>();

const MyNavigator = ({navigation}: Props) => {
  const {kakaoId} = useContext(MainContext);

  if (!kakaoId) {
    return null;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={{title: '프로필', headerShown: false}}
        component={ProfileScreen}
        initialParams={{kakaoId}}
      />

      <Stack.Screen
        name="Following"
        options={{
          title: '팔로잉',
          headerShown: false,
        }}
        component={FollowingScreen}
      />

      <Stack.Screen
        name="Follower"
        options={{
          title: '팔로워',
          headerShown: false,
        }}
        component={FollowerScreen}
      />

      <Stack.Screen
        name="Setting"
        options={{
          headerShown: false,
        }}
        component={SettingScreen}
      />
      <Stack.Screen
        name="Edit"
        options={{
          headerShown: false,
        }}
        component={EditScreen}
      />

      <Stack.Screen
        name="ClubDetail"
        options={{
          headerShown: false,
        }}
        component={ClubDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MyNavigator;
