import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from './CustomText';
import CustomButton, {CustomButtonProps} from './CustomButton';
import {colors} from '@src/constants';

export interface CardProps extends CustomButtonProps {
  style?: StyleProp<ViewStyle>;
  members: number;
  clubName: string;
  time: string;
  location: string;
  row?: 1 | 2;
  onPress?: () => void;
}

const GroupCard = ({
  style,
  members,
  clubName,
  time,
  location,
  row = 1,
  onPress,
  ...props
}: CardProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.container, row === 2 && styles.longContainer, style]}>
        <View style={styles.titleBox}>
          <View style={styles.ingBox}>
            <CustomText
              style={styles.ing}
              numberOfLines={1}>{`${members}명 참여중`}</CustomText>
          </View>
          <CustomText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.title}>
            {clubName}
          </CustomText>
        </View>
        <View style={styles.subBox}>
          <View style={styles.sub}>
            <Image
              resizeMode="center"
              style={styles.icon}
              source={require('@src/assets/icons/clock.png')}
            />
            <CustomText style={styles.subText} numberOfLines={1}>
              {time}
            </CustomText>
          </View>
          <View style={styles.sub}>
            <Image
              resizeMode="center"
              style={styles.icon}
              source={require('@src/assets/icons/position.png')}
            />
            <CustomText style={styles.subText} numberOfLines={1}>
              {location}
            </CustomText>
          </View>
          {row === 2 && (
            <View style={styles.detailBox}>
              <CustomText style={styles.detailText}>상세 보기</CustomText>
              <Image
                resizeMode="center"
                style={{
                  width: 12,
                  height: 12,
                }}
                source={require('@src/assets/icons/right-arrow-gray.png')}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 223,
    height: 150,
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: colors.GRAY,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  longContainer: {
    width: 348,
  },
  titleBox: {},
  ingBox: {
    marginBottom: 5,
    width: 100,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: colors.THEME,
  },
  ing: {
    fontSize: 12,
    color: colors.THEME,
  },
  title: {
    fontSize: 20,
  },
  subBox: {
    position: 'relative',
  },
  sub: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  subText: {
    color: colors.THEME,
    fontSize: 12,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 7,
  },
  detailBox: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: colors.GRAY_300,
    fontSize: 12,
    marginRight: 7,
  },
});

export default GroupCard;
