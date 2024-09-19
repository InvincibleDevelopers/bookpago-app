import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "@src/constants/colors";
import { Image, ImageProps, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface HeaderProps extends ImageProps {
    imageprops?: ImageProps;
    imagestyle?: StyleProp<ImageStyle>;
}

const Header = ({style, imagestyle, imageprops}: HeaderProps) => {
    
    return(
        <View style={[styles.container, style]}>
            {imageprops && <Image style={{width: 120, height: 30, borderWidth: 2}} {...imageprops} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height: "10%",
        backgroundColor: colors.WHITE,
    },
});

export default Header;