import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@src/screens/stack/auth/LoginScreen";
import MainScreen from "@src/screens/stack/auth/MainScreen";
import { AuthScreens } from "@src/types";


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