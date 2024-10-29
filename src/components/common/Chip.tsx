import {colors} from '@src/constants';
import {Pressable, StyleSheet, Text} from 'react-native';

interface ChipProps {
  children: string;
  isActive: boolean;
  onPress: (value: number) => void;
  value: number;
  isLoading?: boolean;
}

const ChipButton = ({
  children,
  isActive,
  onPress,
  value,
  isLoading = false,
}: ChipProps) => {
  return (
    <Pressable
      style={[styles.button, isActive && styles.buttonActive]}
      onPress={() => onPress(value)}>
      <Text
        style={[
          styles.buttonText,
          isActive && styles.buttonTextActive,
          isLoading && styles.buttonIsLoading,
        ]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.WHITE,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 9999,
    borderColor: colors.GRAY_300,
    borderWidth: 1,
  },
  buttonText: {
    color: colors.GRAY_300,
  },
  buttonActive: {
    backgroundColor: colors.THEME,
    borderColor: colors.THEME,
  },
  buttonTextActive: {
    color: colors.WHITE,
  },
  buttonIsLoading: {
    opacity: 0.5,
  },
});

export default ChipButton;
