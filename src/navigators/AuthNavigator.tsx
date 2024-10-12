import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from '@src/screens/auth/LoginScreen';
import AuthMainScreen from '@src/screens/auth/AuthMainScreen';
import TestLoginScreen from '@src/screens/auth/TestLoginScreen';
import {AuthStackParamList} from '@src/types';
import JoinScreen from '@src/screens/auth/JoinScreen';

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
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="TestLogin" component={TestLoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
