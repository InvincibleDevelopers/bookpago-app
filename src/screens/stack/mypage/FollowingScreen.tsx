import UserCard from "@src/components/UserCard";
import useOnStart from "@src/hooks/useOnStart";
import { ScrollView, View } from "react-native";
import axios, { AxiosHeaders } from "axios";
import { DOMAIN } from "@env";
import { useContext, useState } from "react";
import { MyPageScreens, UserProfile } from "@src/types";
import { MainContext } from "@src/utils/Context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import EncryptedStorage from "react-native-encrypted-storage";
import useAPI from "@src/hooks/useAPI";

type Props = NativeStackScreenProps<MyPageScreens>;

const FollowingScreen = ({navigation, route}: Props) => {
    const [data, setData] = useState<UserProfile[]>([]);
    const {user} = useContext(MainContext);
    const {getMutation} = useAPI();

    useOnStart(()=>{
        getMutation.mutate({path: "/profile/follower?targetId=52&page=0&size=10"}, 
            {
                onSuccess: (result) => {
                    const temp: UserProfile = {
                        nickname: result.content[0].nickname,
                        username: result.content[0].username,
                        isMine: false,
                    };
                    setData((prev)=> [...prev, temp]);
                },
            },
        );

    });
    
    return(
        <View>
            {data && data.map((item: UserProfile, index: number) => {
                return(
                    <ScrollView style={{borderBottomWidth: 1}} key={index}>
                        <UserCard OnClick={()=>navigation.navigate("OtherProfile", {props: item})} {...item} />
                    </ScrollView>
                );
            })}
        </View>
    );
};

export default FollowingScreen;