import {View, StyleSheet} from 'react-native';
import CustomButton from '../CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyStackParamList} from '@src/types';
import {colors} from '@src/constants';
import Spacer from '../common/Spacer';

interface MyHeaderProps {
  myKakaoid: number;
  profileKakaoId: number;
}

const MyHeader = ({myKakaoid, profileKakaoId}: MyHeaderProps) => {
  const navigation = useNavigation<NavigationProp<MyStackParamList>>();

  const isMyProfile = myKakaoid == profileKakaoId;

  return (
    <View style={styles.contrainer}>
      <View style={styles.box}>
        {isMyProfile ? (
          <CustomButton
            hitSlop={10}
            text="MY"
            containerstyle={{backgroundColor: 'transparent'}}
            onPress={() => navigation.navigate('Profile', {kakaoId: myKakaoid})}
          />
        ) : (
          <CustomButton
            hitSlop={10}
            imageprops={{
              style: styles.backIcon,
              resizeMode: 'cover',
              source: require('@src/assets/icons/hback-white.png'),
            }}
            onPress={() => navigation.goBack()}
          />
        )}
        <CustomButton
          hitSlop={10}
          onPress={() => navigation.navigate('Setting')}
          containerstyle={{backgroundColor: 'transparent'}}
          imageprops={{
            style: styles.settingIcon,
            resizeMode: 'cover',
            source: require('@src/assets/buttons/gear.png'),
          }}
        />
      </View>
      <Spacer height={50} backgroundColor={colors.THEME} />
    </View>
  );
};

const styles = StyleSheet.create({
  contrainer: {
    backgroundColor: colors.THEME,
  },
  box: {
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

export default MyHeader;
