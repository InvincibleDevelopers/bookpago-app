import {Image, ImageSourcePropType} from 'react-native';

interface Props {
  isFocus: boolean;
  focusIconProp: ImageSourcePropType;
  unFocusIconProp: ImageSourcePropType;
}

const TabIcon = ({isFocus, focusIconProp, unFocusIconProp}: Props) => {
  return (
    <Image
      style={{width: 40, height: 40}}
      resizeMode="center"
      source={isFocus ? focusIconProp : unFocusIconProp}
    />
  );
};

export default TabIcon;
