import {Image, StyleSheet, View, Text} from 'react-native';
import Pressable from '../CustomButton';
import CustomButton from '../CustomButton';
import {colors} from '@src/constants';
import Divider from '../common/Divider';
import Spacer from '../common/Spacer';
import {FollowItem as FollowItemType} from '@src/api/profile';

interface FollowItemProps {
  onPress: () => void;
  item: FollowItemType;
  isFollowing?: boolean;
  onPressFollow?: (isFollow: boolean) => void;
}

const FollowItem = ({
  item,
  isFollowing = false,
  onPress,
  onPressFollow,
}: FollowItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        resizeMode={'cover'}
        style={styles.image}
        source={require('@src/assets/user/profile.png')}
      />

      <View style={styles.contentBox}>
        <Text style={styles.nickname}>{item.nickname}</Text>
        <Spacer height={5} />

        {/* <View style={styles.subBox}>
          <Text style={styles.sub}>평가</Text>
          <Divider type="vertical" style={{height: 15}} />
          <Text style={styles.sub}>코멘트</Text>
        </View> */}
      </View>

      {isFollowing && (
        <CustomButton
          onPress={() => onPressFollow?.(false)}
          textprops={{style: styles.buttonText}}
          containerstyle={styles.button}
          text="팔로우"
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    overflow: 'hidden',
    marginRight: 15,
  },
  contentBox: {
    flex: 1,
  },
  nickname: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  subBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sub: {
    fontSize: 14,
    color: colors.GRAY_400,
  },
  button: {
    backgroundColor: '#cdd4db',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#214868',
    fontWeight: 'medium',
  },
});

export default FollowItem;
