import UserCard from "@src/components/UserCard";
import useOnStart from "@src/hooks/useOnStart";
import { ScrollView, View } from "react-native";
import axios from "axios";
import { DOMAIN } from "@env";
import { useContext, useState } from "react";
import { MyPageScreens, UserProfile } from "@src/types";
import { MainContext } from "@src/utils/Context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type Props = NativeStackScreenProps<MyPageScreens>;

const FollowingScreen = ({navigation, route}: Props) => {
    const [data, setData] = useState<UserProfile[]>([]);
    const {user} = useContext(MainContext);

    useOnStart(async () => {
        const result = await axios.get(`${DOMAIN}/profile/getfollowerlist?targetId=2`);
        let temp: UserProfile[] = [];
        for(let i = 0; i < result.data.content.length; ++i) {
            const tempuser: UserProfile = {
                nickname: result.data.content[i].nickname,
                username: result.data.content[i].username,
            };
            temp.push(tempuser);
        }
        setData(temp);
    });
    
    return(
        <View>
            {data && data.map((item: UserProfile, index: number) => {
                return(
                    <ScrollView style={{borderBottomWidth: 1}} key={index}>
                        <UserCard OnClick={()=>navigation.navigate("Profile", {userId: item.nickname})} {...item} />
                    </ScrollView>
                );
            })}
        </View>
    );
};

export default FollowingScreen;