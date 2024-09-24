import React, {useContext} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {TabNavigators} from '@src/types';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {MainContext} from '@src/utils/Context';
import AuthNavigator from './tab/AuthNavigator';
import AppNavigator from './tab/AppNavigator';

const Stack = createStackNavigator<TabNavigators>();

const ref = createNavigationContainerRef();

const RootNavigator = () => {
  const {bIsLogin, setTabVisibility} = useContext(MainContext);

  return (
    <NavigationContainer
      ref={ref}
      onStateChange={() => {
        const name = ref.getCurrentRoute()?.name;
        const isHide = name?.split('__')[1] === 'hide' ? false : true;
        setTabVisibility(isHide);
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}>
        {bIsLogin ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
