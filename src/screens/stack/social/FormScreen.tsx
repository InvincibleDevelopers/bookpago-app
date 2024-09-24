import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '@src/components/common/DismissKeyboardView';
import {SocialScreens} from '@src/types';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<SocialScreens, 'Form'>;

const FormScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DismissKeyboardView style={{flex: 1}}>
        <ScrollView></ScrollView>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default FormScreen;
