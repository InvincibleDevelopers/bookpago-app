import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchHeader from '@src/components/common/header/SearchHeader';
import {RootStackParamList} from '@src/types';
import {SafeAreaView, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'DM'>;

const DMScreen = ({navigation}: Props) => {
  return <SafeAreaView>{/* <SearchHeader /> */}</SafeAreaView>;
};

const styles = StyleSheet.create({});

export default DMScreen;
