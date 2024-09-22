import { ScrollView } from "react-native";


const useList = <T extends React.ReactNode>(input: Array<T>) => {
    if(input.length === 0) {
        return;
    }

    return (
        input.map((item: T, index: number) => {
            return(
                <ScrollView style={{borderBottomWidth: 1}} key={index}>
                {item}                        
                </ScrollView>
            );
        }));
};  

export default useList;