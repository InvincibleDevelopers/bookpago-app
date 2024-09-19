import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import CustomText from './CustomText';
import { colors } from '@src/constants/colors';

interface InputFieldProps extends TextInputProps {
    text: string;
}

const InputField = ({text, style, ...props}: InputFieldProps) => {

  return (
    <View>
      <CustomText style={{fontSize: 16, marginLeft: 15}}>{text}</CustomText>
      <TextInput style={[styles.container, style]} {...props}>

      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.GRAY,
        borderRadius: 12,
        marginTop: 15,
        paddingLeft: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
});

export default InputField;
