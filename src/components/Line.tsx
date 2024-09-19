import {colors} from '@src/constants/colors';
import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

interface LineProps extends ViewProps {
  type?: 'vertical' | 'horizontal';
}

const Line = ({type = 'horizontal', ...props}: LineProps) => {
  return (
    <View {...props} style={[styles.container, styles[type], props.style]} />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    borderTopColor: colors.GRAY_200,
    borderTopWidth: 1,
  },
  vertical: {
    borderLeftColor: colors.GRAY_200,
    borderLeftWidth: 1,
  },
});

export default Line;
