import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface DismissKeyboardViewProps {
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
    <KeyboardAvoidingView
      {...props}
      style={props.style}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
