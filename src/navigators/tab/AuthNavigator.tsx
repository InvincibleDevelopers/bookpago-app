import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "@src/screens/tab/HomeTab";
import { AuthScreens, MainTabs, TabNavigators } from "@src/types";
import MyPageTab from "@src/screens/tab/MyPageTab";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "@src/screens/stack/auth/MainScreen";
import LoginScreen from "@src/screens/stack/auth/LoginScreen";


const Stack = createStackNavigator<AuthScreens>();

const AuthNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Main" component={MainScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;