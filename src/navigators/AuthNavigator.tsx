import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@src/screens/auth/LoginScreen';
import MainScreen from '@src/screens/auth/MainScreen';
import TestScreen from '@src/screens/auth/TestScreen';
import {AuthStackParamList} from '@src/types';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
