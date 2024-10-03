import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@src/screens/SplashScreen';
import {RootStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import React, {useContext} from 'react';
import HomeNavigator from './home/HomeNavigator';
import AuthNavigator from './AuthNavigator';
import DetailScreen from '@src/screens/home/search/DetailScreen';

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
        // cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
      }}>
      {kakaoId !== null ? (
        <Stack.Screen name="Home" component={HomeNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
