import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {MainTabs, SocialScreens} from '@src/types';
import MainScreen from '../stack/social/MainScreen';
import DetailScreen from '../stack/social/DetailScreen';
import CategoryScreen from '../stack/social/CategoryScreen';
import FormScreen from '../stack/social/FormScreen';

type Props = BottomTabScreenProps<MainTabs, 'Social'>;

const Stack = createStackNavigator<SocialScreens>();

const SocialTab = ({navigation}: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={MainScreen}
      />
      <Stack.Screen
        name="Category__hide"
        options={{
          headerShown: false,
        }}
        component={CategoryScreen}
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

export default SocialTab;
