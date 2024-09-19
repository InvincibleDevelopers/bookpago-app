import {Image, StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import CustomText from './CustomText';
import CustomButton, {CustomButtonProps} from './CustomButton';
import {colors} from '@src/constants/colors';

export interface CardProps extends CustomButtonProps {
    style?: StyleProp<ViewStyle>;
    members: number;
    clubName: string;
    time: string;
    location: string;
}

const GroupCard = ({style, members, clubName, time, location, ...props}: CardProps) => {
  return (
    <View style={[styles.container, style]}>
      <CustomButton bApplyCommonStyle={false} style={styles.button}>
        <CustomText style={styles.ing}>{`${members}명 참여중`}</CustomText>
        <CustomText numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {clubName}
        </CustomText>
        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Image source={require('@src/assets/icons/clock.png')} />
            <CustomText style={{fontSize: 16, marginBottom: 3}}>
              {time}
            </CustomText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Image source={require('@src/assets/icons/position.png')} />
            <CustomText style={{fontSize: 16, marginBottom: 3}}>
              {location}
            </CustomText>
          </View>
        </View>
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 223,
    height: 147,
    marginRight: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
  },
  ing: {
    fontSize: 12,
    marginBottom: 5,
    width: 100,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
  },
});

export default GroupCard;
