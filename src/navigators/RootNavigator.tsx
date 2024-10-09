import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SplashScreen from '@src/screens/SplashScreen';
import {RootStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import React, {useContext} from 'react';
import HomeNavigator from './home/HomeNavigator';
import AuthNavigator from './AuthNavigator';
import ChatScreen from '@src/screens/ChatScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {isLoading, kakaoId} = useContext(MainContext);

  if (isLoading) {
    // splash screen
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
      }}>
      {kakaoId !== null ? (
        <Stack.Screen name="HomeTab" component={HomeNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
