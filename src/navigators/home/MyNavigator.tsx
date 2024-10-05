import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabParamList, MyStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useContext} from 'react';
import FollowingScreen from '../../screens/home/my/FollowingScreen';
import ProfileScreen from '../../screens/home/my/ProfileScreen';
import SettingScreen from '../../screens/home/my/SettingScreen';
import EditScreen from '@src/screens/home/my/EditScreen';
import ClubDetailScreen from '@src/screens/home/ClubDetailScreen';

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
        name="Followee"
        options={{
          title: '팔로잉',
          headerShown: false,
        }}
        component={FollowingScreen}
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
