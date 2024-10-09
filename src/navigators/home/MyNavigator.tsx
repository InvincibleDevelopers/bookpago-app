import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {HomeTabParamList, MyStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext} from 'react';
import FollowerScreen from '@src/screens/home/profile/FollowerScreen';
import ProfileScreen from '@src/screens/home/profile/ProfileScreen';
import SettingScreen from '@src/screens/home/profile/SettingScreen';
import EditScreen from '@src/screens/home/profile/EditScreen';
import ClubDetailScreen from '@src/screens/home/ClubDetailScreen';
import FollowingScreen from '@src/screens/home/profile/FollowingScreen';

type Props = BottomTabScreenProps<HomeTabParamList, 'My'>;
const Stack = createStackNavigator<MyStackParamList>();

const MyNavigator = ({navigation}: Props) => {
  const {kakaoId} = useContext(MainContext);

  if (!kakaoId) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Profile"
        options={{title: '프로필'}}
        component={ProfileScreen}
        initialParams={{kakaoId}}
      />

      <Stack.Screen
        name="Following"
        options={{title: '팔로잉'}}
        component={FollowingScreen}
        initialParams={{kakaoId}}
      />

      <Stack.Screen
        name="Follower"
        options={{title: '팔로워'}}
        component={FollowerScreen}
        initialParams={{kakaoId}}
      />

      <Stack.Screen
        name="Setting"
        options={{title: '설정'}}
        component={SettingScreen}
      />

      <Stack.Screen
        name="Edit"
        options={{title: '프로필 수정'}}
        component={EditScreen}
      />

      <Stack.Screen
        name="ClubDetail"
        options={{title: '독서모임 상세'}}
        component={ClubDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MyNavigator;
