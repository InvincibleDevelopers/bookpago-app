import {
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

interface CustomTextProps extends TextProps {
  text?: string;
}

const CustomText = ({text, style, ...props}: CustomTextProps) => {
  const customStyle: TextStyle = {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
  };

  return <Text style={[customStyle, style]} {...props} />;
};

export default CustomText;
