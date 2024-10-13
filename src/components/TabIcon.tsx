import {colors} from '@src/constants';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';

interface Props {
  isFocus: boolean;
  focusIconProp: ImageSourcePropType;
  unFocusIconProp: ImageSourcePropType;
  text: string;
}

const TabIcon = ({isFocus, focusIconProp, unFocusIconProp, text}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={isFocus ? focusIconProp : unFocusIconProp}
      />
      <Text style={[styles.text, isFocus && styles.textActive]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 28,
    height: 28,
  },
  text: {
    color: colors.GRAY_300,
    fontSize: 12,
  },
  textActive: {
    color: colors.THEME,
  },
});

export default TabIcon;
