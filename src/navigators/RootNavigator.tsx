import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigators } from "@src/types";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { MainContext } from '@src/utils/Context';
import AuthNavigator from './tab/AuthNavigator';
import AppNavigator from './tab/AppNavigator';


const Stack = createStackNavigator<TabNavigators>();

const RootNavigator = () => {

    const { bIsLogin } = useContext(MainContext);
    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ 
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                }}>
                {bIsLogin ? <Stack.Screen name="App" component={AppNavigator} /> : <Stack.Screen name="Auth" component={AuthNavigator} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;