import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from '../../CustomText';
import {CustomButtonProps} from '../../CustomButton';
import {CYCLE, WEEKDAYS, colors} from '@src/constants';
import Spacer from '../Spacer';

const ROW1_WIDTH = 223;
const ROW2_WIDTH = 348;

export interface ClubCardProps extends CustomButtonProps {
  row?: 1 | 2;
  data: SocialClub;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const ClubCard = ({style, data, row = 1, onPress}: ClubCardProps) => {
  const weekdayText = data.weekDay.map(day => WEEKDAYS[day]).join(', ');
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.container, row === 2 && styles.longContainer, style]}>
        <View style={styles.ingBox}>
          <CustomText
            style={styles.ing}
            numberOfLines={1}>{`${data.members}명 참여중`}</CustomText>
        </View>
        <Spacer height={7} />
        <CustomText numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {data.clubName}
        </CustomText>
        <Spacer height={14} />
        <View style={styles.sub}>
          <Image
            resizeMode="center"
            style={styles.icon}
            source={require('@src/assets/icons/clock.png')}
          />
          <CustomText style={styles.subText} numberOfLines={1}>
            {`${CYCLE[data.repeatCycle]} (${weekdayText}) ${data.time}`}
          </CustomText>
        </View>
        <Spacer height={7} />
        <View style={styles.sub}>
          <Image
            resizeMode="center"
            style={styles.icon}
            source={require('@src/assets/icons/position.png')}
          />
          <CustomText
            style={[styles.subText, row === 2 && styles.longSub]}
            numberOfLines={1}>
            {data.location}
          </CustomText>
        </View>
        {row === 2 && (
          <>
            <Spacer height={7} />
            <View style={styles.detailBox}>
              <Image
                resizeMode="center"
                style={{
                  width: 12,
                  height: 12,
                }}
                source={require('@src/assets/icons/right-arrow-gray.png')}
              />
              <CustomText style={styles.detailText}>상세 보기</CustomText>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ROW1_WIDTH,
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.WHITE,

    borderWidth: 1,
    borderColor: colors.GRAY,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  longContainer: {
    width: ROW2_WIDTH,
  },
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
  sub: {
    flexDirection: 'row',
    width: ROW1_WIDTH - 40,
  },
  longSub: {
    width: ROW2_WIDTH - 40,
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  detailText: {
    color: colors.GRAY_300,
    fontSize: 12,
    marginRight: 7,
  },
});

export default ClubCard;
