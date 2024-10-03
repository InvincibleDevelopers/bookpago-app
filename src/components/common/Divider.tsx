import {colors} from '@src/constants/colors';
import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

interface LineProps extends ViewProps {
  type?: 'vertical' | 'horizontal';
}

const Divider = ({type = 'horizontal', ...props}: LineProps) => {
  return (
    <View {...props} style={[styles.container, styles[type], props.style]} />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
  },
  horizontal: {
    height: 1,
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});

export default Divider;
