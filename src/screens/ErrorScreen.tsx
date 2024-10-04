import {useNavigation} from '@react-navigation/native';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import Header from '@src/components/common/header/Header';
import {colors} from '@src/constants';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

interface ErrorScreenProps {
  errorMessage: string;
}

const ErrorScreen = ({errorMessage}: ErrorScreenProps) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CustomText style={styles.messageText}>{errorMessage}</CustomText>
        <CustomButton
          bApplyCommonStyle={true}
          containerstyle={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 3,
          }}
          text="뒤로가기"
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
});

export default ErrorScreen;
