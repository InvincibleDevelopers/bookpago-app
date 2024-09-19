import { UserProfile } from "@src/types/UserProfile";
import { createContext, useState } from "react";


type ContextProps = {
    bIsLogin: boolean;
    nickname: string;
    user: UserProfile;
    token: string;

    setLogin: (flag: boolean)=>void;
    setNickname: (value: string) => void;
    setUser: (value: UserProfile) => void;
    setToken: (value: string) => void;
}

const defaultContext: ContextProps = {
    bIsLogin: true,
    nickname: "",
    user: {username: -1, nickname: ""},
    token: "",

    setUser: (value) => {},
    setLogin: (flag)=>{},
    setNickname: (value) => {},
    setToken: (value)=>{},
};


export const MainContext = createContext(defaultContext);

const ContextProvider = ({children}: {children: React.ReactNode}) => {
    const [bIsLogin, setIsLogin] = useState(false);
    const [nickname, setNick] = useState("");
    const [user, setCurrentUser] = useState<UserProfile>({username: -1, nickname: ""});
    const [token, setCurrentToken] = useState("");

    const setUser = (value: UserProfile) => {
        setCurrentUser(value);
    };


    const setNickname = (value: string) => {
        setNick(value);
    };

    const setLogin = (flag: boolean) => {
        setIsLogin(flag);
    };

    const setToken = (value: string) => {
        setCurrentToken(value);
    };

    return(
        <MainContext.Provider value={{token, setToken, user, setUser, bIsLogin, setLogin, nickname, setNickname}}>
            {children}
        </MainContext.Provider>
    );

};  

export default ContextProvider;