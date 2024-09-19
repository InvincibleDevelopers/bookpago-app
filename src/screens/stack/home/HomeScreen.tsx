import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomButton from "@src/components/CustomButton";
import Header from "@src/components/Header";
import { colors } from "@src/constants/colors";
import { HomeScreens } from "@src/types";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

type Props = NativeStackScreenProps<HomeScreens, "Main">;

const HomeScreen = ({navigation, route}: Props) => {
    const tabnav = navigation.getParent();
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Header style={styles.header} imageprops={{source: require("@src/assets/logo/title.png"),  resizeMode: "center"}}/>
                <CustomButton onPress={()=>tabnav?.navigate("MyPage")} bApplyCommonStyle={false} style={styles.buttons} imageprops={{ style: {flex: 1}, resizeMode: "contain", source: require("@src/assets/buttons/my.png") }}/>
            </View>
        </SafeAreaView>
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

export default HomeScreen;