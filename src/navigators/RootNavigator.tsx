import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from '@src/screens/SplashScreen';
import {RootStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import React, {useContext} from 'react';
import HomeTabNavigator from './home/HomeTabNavigator';
import AuthNavigator from './AuthNavigator';
import ChatScreen from '@src/screens/ChatScreen';
import DMScreen from '@src/screens/DMScreen';
import ClubFormScreen from '@src/screens/ClubFormScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {isLoading, kakaoId} = useContext(MainContext);

  if (isLoading) {
    // splash screen
    return <SplashScreen />;
  }

  if (kakaoId === null) {
    return <AuthNavigator />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
      <Stack.Screen name="ClubForm" component={ClubFormScreen} />
      <Stack.Screen name="DM" component={DMScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
