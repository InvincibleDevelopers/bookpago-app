import React from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import CustomText from './CustomText';
import {colors} from '@src/constants';

interface NodataViewProps {
  text: string;
}

const NodataView = ({text}: NodataViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.nodataBox}>
        <Image
          style={{
            width: Dimensions.get('screen').width * 0.5,
            height: Dimensions.get('screen').width * 0.5,
          }}
          source={require('@src/assets/logo/logo-translucent.png')}
          resizeMode="center"
        />
        <CustomText style={styles.messageText}>{text}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nodataBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
});

export default NodataView;
