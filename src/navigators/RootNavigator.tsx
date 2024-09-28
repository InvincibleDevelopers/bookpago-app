import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {TabNavigators} from '@src/types';
import {MainContext} from '@src/utils/Context';
import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppNavigator from './tab/AppNavigator';
import AuthNavigator from './tab/AuthNavigator';
import {colors} from '@src/constants';

const Stack = createStackNavigator<TabNavigators>();

const ref = createNavigationContainerRef();

const RootNavigator = () => {
  const {isLoading, kakaoId, setTabVisibility} = useContext(MainContext);

  if (isLoading) {
    // splash screen
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.THEME} />
      </View>
    );
  }

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
        {kakaoId !== null ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
