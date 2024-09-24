import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SocialScreens} from '@src/types';
import {SafeAreaView, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<SocialScreens, 'Detail'>;

const DetailScreen = ({navigation}: Props) => {
  return <SafeAreaView style={{flex: 1}}></SafeAreaView>;
};

const styles = StyleSheet.create({});

export default DetailScreen;
