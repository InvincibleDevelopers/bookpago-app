import { NativeStackScreenProps } from "@react-navigation/native-stack";
import UserCard from "@src/components/UserCard";
import useAPI from "@src/hooks/useAPI";
import useOnStart from "@src/hooks/useOnStart";
import { MyPageScreens, UserProfile } from "@src/types";
import { MainContext } from "@src/utils/Context";
import { useContext, useState } from "react";
import { ScrollView, View } from "react-native";

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