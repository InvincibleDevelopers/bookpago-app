import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { UserProfile } from "./UserProfile";

export type MainTabs = {
    Home: undefined;
    Search: undefined;
    Social: undefined;
    Calendar: undefined;
    MyPage: undefined;
}

export type TabNavigators = {
    Auth: undefined;
    App: undefined;
}

export type AuthScreens = {
    Main: undefined;
    Login: undefined;
}

export type HomeScreens = {
    Main: {tabnav: BottomTabNavigationProp<MainTabs>};
}


export type MyPageScreens = {
    Profile: undefined;
    OtherProfile: {props: UserProfile};
    Followee: undefined;
    Follower: undefined;
    Setting: undefined;
}

