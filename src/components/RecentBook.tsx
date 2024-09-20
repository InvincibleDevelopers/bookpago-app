import { Image, StyleSheet, Text, View } from "react-native";
import CustomText from "./CustomText";
import { RecentBookProps } from "@src/types";


const RecentBook = ({path, title, detail}: RecentBookProps) => {

    return(
        <View style={styles.container}>
            <Image style={styles.image} resizeMode="cover" source={{uri: `${path}`}}/>
            <CustomText numberOfLines={1} style={styles.title}>{title}</CustomText>
            <CustomText style={styles.detail}>{detail}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: "50%",
    },
    image: {
        width: "100%",
        height: "75%",
    },
    title: {
        fontSize: 16,
    },
    detail: {
        fontSize: 14,
    },
});

export default RecentBook;