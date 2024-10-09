import {View, StyleSheet} from 'react-native';
import CustomButton from '../CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyStackParamList} from '@src/types';

interface MyBackHeaderProps {}

const MyBackHeader = ({}: MyBackHeaderProps) => {
  const navigation = useNavigation<NavigationProp<MyStackParamList>>();

  return (
    <View style={styles.container}>
      <CustomButton
        hitSlop={10}
        imageprops={{
          style: styles.backIcon,
          resizeMode: 'cover',
          source: require('@src/assets/icons/hback-white.png'),
        }}
        onPress={() => navigation.goBack()}
      />
      <CustomButton
        hitSlop={10}
        onPress={() => navigation.navigate('Setting')}
        imageprops={{
          style: styles.settingIcon,
          resizeMode: 'cover',
          source: require('@src/assets/buttons/gear.png'),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  settingIcon: {
    width: 35,
    height: 35,
  },
});

export default MyBackHeader;
