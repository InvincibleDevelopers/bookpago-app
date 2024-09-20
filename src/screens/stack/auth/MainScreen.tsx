import { DOMAIN } from "@env";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomButton from "@src/components/CustomButton";
import { colors } from "@src/constants/colors";
import useOnStart from "@src/hooks/useOnStart";
import { UserProfile } from "@src/types/UserProfile";
import { AuthScreens, TabNavigators } from "@src/types";
import { MainContext } from "@src/utils/Context";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import useAPI from "@src/hooks/useAPI";

type Props = NativeStackScreenProps<AuthScreens, "Main">;

const MainScreen = ({navigation}: Props) => {
    const {setLogin, user, setUser } = useContext(MainContext);
    
    
    
    useOnStart(async ()=> {
        // const username = await EncryptedStorage.getItem("username");
        // if(!username) {
        //     return;
        // }

        // const result = await axios.get(`${DOMAIN}/user/login?username=${username}`);
        // if(result.data !== "error") {
        //     setUser({
        //         username: Number(username),
        //         nickname: result.data.nickname,
        //     });

        //     setLogin(true);
        // }


        setLogin(true);

    });


    

    return(
        <SafeAreaView style={styles.container}>
            <Image style={{width: 105.45, height: 113.45}} source={require("@src/assets/logo/logo.png")} />
            <Image style={{width: 177.21, height: 56.22, marginTop: 20}} source={require("@src/assets/logo/title.png")} />
            <CustomButton onPress={()=>navigation.navigate("Login")} containerstyle={styles.button} text="로그인하기" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        position: "absolute",
        top: "70%",
        width: 352,
        height: 56,
    },
});

export default MainScreen;