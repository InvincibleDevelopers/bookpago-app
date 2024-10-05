import {colors} from '@src/constants';
import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

interface LoadingViewProps {
  color?: string;
}

const LoadingView = ({color = colors.THEME}: LoadingViewProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" style={{flex: 1}} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default LoadingView;
