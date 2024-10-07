import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import Spacer from '../Spacer';
import {colors} from '@src/constants';

interface ClubMemberCardProps {
  onPress: () => void;
  kakaoId: number;
  nickname: string;
  profilUrl: string;
  disabled?: boolean;
}

const ClubMemberCard = ({
  onPress,
  kakaoId,
  nickname,
  profilUrl,
  disabled = false,
}: ClubMemberCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.nicknameText} numberOfLines={1}>
        {nickname}
      </Text>
      <Spacer height={20} />
      <Image
        style={styles.profileImage}
        resizeMode="cover"
        source={
          profilUrl ? {uri: profilUrl} : require('@src/assets/user/profile.png')
        }
      />
      <Spacer height={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 5,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    alignItems: 'center',
    width: 120,
  },
  nicknameText: {
    color: colors.BLACK,
    fontSize: 17,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    overflow: 'hidden',
  },
});

export default ClubMemberCard;
