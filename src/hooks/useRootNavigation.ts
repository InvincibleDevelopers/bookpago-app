import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@src/types';

export const useRootNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};
