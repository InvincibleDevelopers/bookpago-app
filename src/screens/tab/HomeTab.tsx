import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { colors } from "@src/constants/colors";
import { HomeScreens, MainTabs } from "@src/types";
import { StyleSheet } from "react-native";
import HomeScreen from "../stack/home/HomeScreen";



type Props = BottomTabScreenProps<MainTabs, "Home">;
const Stack = createStackNavigator<HomeScreens>();

const HomeTab = ({navigation}: Props) => {

    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        }}
        >
            <Stack.Screen name="Main" component={HomeScreen}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
    },
    headerContainer: {
        flex: 1,
    },
    buttons: {
        position: "absolute",
        left: "85%",
        top: "3%",
        width: 30,
        height: 30,
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
    },
});

export default HomeTab;