import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../CustomText';

interface SectionButtonProps {
  onPress?: () => void;
  children: string;
  disabled?: boolean;
}

const SectionButton = ({
  onPress,
  children,
  disabled = false,
}: SectionButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}>
      <CustomText style={styles.text}>{children}</CustomText>
      <Image
        source={require('@src/assets/icons/next.png')}
        style={styles.icon}
        resizeMode="center"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginRight: 7,
  },
  icon: {
    width: 22,
    height: 22,
  },
});

export default SectionButton;
