import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabParamList, SocialStackParamList} from '@src/types';
import MainScreen from '../../screens/home/social/MainScreen';
import FormScreen from '../../screens/home/social/FormScreen';
import ClubDetailScreen from '../../screens/home/ClubDetailScreen';

type Props = BottomTabScreenProps<HomeTabParamList, 'Social'>;

const Stack = createStackNavigator<SocialStackParamList>();

const SocialNavigator = ({navigation}: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={MainScreen}
      />
      <Stack.Screen
        name="Form"
        options={{
          headerShown: false,
        }}
        component={FormScreen}
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
