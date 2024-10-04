import {colors} from '@src/constants';
import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" style={{flex: 1}} color={colors.THEME} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default LoadingView;
