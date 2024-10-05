import {View, StyleSheet} from 'react-native';
import CustomButton from '../CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyStackParamList} from '@src/types';

interface MyHeaderProps {
  myKakaoid: number;
}

const MyHeader = ({myKakaoid}: MyHeaderProps) => {
  const navigation = useNavigation<NavigationProp<MyStackParamList>>();

  return (
    <View style={styles.container}>
      <CustomButton
        hitSlop={10}
        text="MY"
        onPress={() => navigation.navigate('Profile', {kakaoId: myKakaoid})}
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
  settingIcon: {
    width: 35,
    height: 35,
  },
});

export default MyHeader;
