import {Image, Pressable, PressableProps} from 'react-native';

interface ToggleStarProps extends PressableProps {
  isActive: boolean;
}

const ToggleStar = ({isActive, ...props}: ToggleStarProps) => {
  return (
    <Pressable {...props}>
      <Image
        style={{width: 30, height: 30}}
        source={
          isActive
            ? require('@src/assets/icons/star-active.png')
            : require('@src/assets/icons/star.png')
        }
        resizeMode="center"
      />
    </Pressable>
  );
};

export default ToggleStar;
