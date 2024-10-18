import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ClubDetailScreen from '@src/screens/home/ClubDetailScreen';
import SocialMainScreen from '@src/screens/home/social/SocialMainScreen';
import {HomeTabParamList, SocialStackParamList} from '@src/types';

type Props = BottomTabScreenProps<HomeTabParamList, 'Social'>;

const Stack = createStackNavigator<SocialStackParamList>();

const SocialNavigator = ({navigation}: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SocialMain"
        options={{headerShown: false}}
        component={SocialMainScreen}
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

export default SocialNavigator;
