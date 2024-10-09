import {Image, StyleSheet, View, Text, Pressable} from 'react-native';
import CustomButton from '../CustomButton';
import {colors} from '@src/constants';
import Divider from '../common/Divider';
import Spacer from '../common/Spacer';

interface DMItemProps {
  onPress: () => void;
  isFollowing?: boolean;
  onPressFollow?: (isFollow: boolean) => void;
  nickname: string;
}

const DMItem = ({
  onPress,
  onPressFollow,
  nickname,
  isFollowing = false,
}: DMItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        resizeMode={'cover'}
        style={styles.image}
        source={require('@src/assets/user/profile.png')}
      />

      <View style={styles.contentBox}>
        <Text style={styles.nickname} numberOfLines={1}>
          {nickname}
        </Text>

        <Spacer height={5} />

        <View style={styles.subBox}>
          <Text style={styles.sub} numberOfLines={1}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
            asperiores hic eos architecto modi nobis itaque qui, necessitatibus,
            suscipit debitis iusto eaque? Quod veniam voluptas excepturi
            nesciunt dignissimos iure repudiandae?
          </Text>
        </View>
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

export default DMItem;
