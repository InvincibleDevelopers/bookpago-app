import { Alert, Image, StyleSheet, View } from "react-native";
import CustomButton from "./CustomButton";
import { UserProfile } from "@src/types";
import axios from "axios";
import { DOMAIN } from "@env";
import { useContext } from "react";
import { MainContext } from "@src/utils/Context";
import EncryptedStorage from "react-native-encrypted-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { MyPageScreens } from "@src/types";
import useAPI from "@src/hooks/useAPI";

const UserCard = ({OnClick, username, nickname, kakaoOauthToken, gender, age, genre, introduce}: UserProfile) => {
    const {user} = useContext(MainContext);
    const {postMutation} = useAPI();

    const Submit = () => {
        postMutation.mutate({path: "/profile/follow", body: {
            follower: String(username),
            followee: String(user.username),
        }},
    {
        onSuccess: ()=>{
            Alert.alert("처리되었습니다");
        },
    });
    };


    return(
        <CustomButton onPress={()=>OnClick?.()} style={styles.container}>
            <Image resizeMode={"cover"} style={styles.image} source={require("@src/assets/user/profile.png")} />
            <View style={{gap: 10}}>
                <CustomButton pointerEvents={"none"} bApplyCommonStyle={false} textprops={{style: {left: "-35%", fontSize: 18, color: "black"}}} text={nickname} />
                <View style={{left: "-25%", flexDirection: "row", gap: 20}}>
                    <CustomButton pointerEvents={"none"} bApplyCommonStyle={false} textprops={{style: {left: "-35%", fontSize: 14, color: "gray"}}} text="평가" />
                    <CustomButton pointerEvents={"none"} bApplyCommonStyle={false} textprops={{style: {left: "-35%", fontSize: 14, color: "gray"}}} text="코멘트" />
                </View>
            </View>
            <CustomButton onPress={Submit} textprops={{style: {fontSize: 16, color: "#214868"}}} containerstyle={styles.button} text={"언팔로우"} />
        </CustomButton>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
    },
    image: {
        width: 60,
        height: 60,
    },
    button: {
        backgroundColor: "#cdd4db",
        height: 40,
        top: "25%",
        padding: 5,
        paddingHorizontal: 10,
    },
});

export default UserCard;