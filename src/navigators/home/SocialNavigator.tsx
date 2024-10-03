import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabParamList, SocialStackParamList} from '@src/types';
import MainScreen from '../../screens/home/social/MainScreen';
import FormScreen from '../../screens/home/social/FormScreen';
import DetailScreen from '../../screens/home/social/DetailScreen';

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
        name="Detail"
        options={{
          headerShown: false,
        }}
        component={DetailScreen}
      />
      <Stack.Screen
        name="Form"
        options={{
          headerShown: false,
        }}
        component={FormScreen}
      />
    </Stack.Navigator>
  );
};

export default SocialNavigator;
