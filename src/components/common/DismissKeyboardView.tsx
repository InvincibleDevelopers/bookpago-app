import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  KeyboardAwareProps,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

interface DismissKeyboardViewProps extends KeyboardAwareProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * 키보드와 input이 겹치는걸 막아주고,
 * input이 아닌 요소와 상호작용시 키보드 내림
 */
const DismissKeyboardView = ({
  children,
  ...props
}: DismissKeyboardViewProps) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView
      {...props}
      style={props.style}
      extraScrollHeight={0}
      extraHeight={0}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
