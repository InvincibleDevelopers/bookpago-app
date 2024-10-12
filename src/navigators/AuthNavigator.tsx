import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from '@src/screens/auth/LoginScreen';
import AuthMainScreen from '@src/screens/auth/AuthMainScreen';
import TestScreen from '@src/screens/auth/TestScreen';
import {AuthStackParamList} from '@src/types';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="AuthMain" component={AuthMainScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
