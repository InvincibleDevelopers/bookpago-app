import {HEADER_HEIGHT} from '@src/constants';
import {colors} from '@src/constants/colors';
import React, {Children} from 'react';
import {
  Image,
  ViewProps,
  ImageProps,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

interface BackHeaderProps extends ViewProps {
  imageProps?: ImageProps & {
    isShow?: boolean;
    onPress?: () => void;
  };
  title?: string;
  buttons?: React.ReactNode[];
}

const BackHeader = ({style, title, buttons, imageProps}: BackHeaderProps) => {
  const isShowImage = imageProps?.isShow || true; // 기본적으로는 보여준다.

  return (
    <View style={[styles.container, style]}>
      {isShowImage && (
        <TouchableWithoutFeedback onPress={imageProps?.onPress}>
          <Image
            style={[styles.image, imageProps?.style]}
            source={require('@src/assets/icons/hback.png')}
            resizeMode="center"
            {...imageProps}
          />
        </TouchableWithoutFeedback>
      )}
      <Text style={styles.title}>{title}</Text>
      <View>
        {Children.map(buttons, (button, index) => {
          // key값을 넣어주기 위해 React.Fragment 사용
          return (
            <React.Fragment key={`header_button_${index}`}>
              {button}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,

    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BackHeader;
