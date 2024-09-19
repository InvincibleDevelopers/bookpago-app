import { Image, ImageProps, Pressable, PressableProps, StyleProp, StyleSheet, TextProps, TextStyle, ViewStyle } from "react-native";
import CustomText from "./CustomText";
import { colors } from "@src/constants/colors";

export interface CustomButtonProps extends PressableProps {
    text?: string;
    imageprops?: ImageProps;
    textprops?: TextProps;
    containerprops?: PressableProps;
    containerstyle?: StyleProp<ViewStyle>;
    textstyle?: StyleProp<TextStyle>;
    bApplyCommonStyle?: boolean;
    children?: React.ReactNode;
}

const CustomButton = ({children, textstyle, textprops, text, bApplyCommonStyle = true, containerstyle, imageprops, containerprops, ...props}: CustomButtonProps) => {

    return(
        <Pressable style={[(bApplyCommonStyle && styles.container), containerstyle]} {...containerprops} {...props} >
            {imageprops && <Image {...imageprops} />}
            {children}
            {text && <CustomText style={[{color: "white", fontWeight: "bold", fontSize: 20}, textstyle]} {...textprops}>{text}</CustomText>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.THEME,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CustomButton;