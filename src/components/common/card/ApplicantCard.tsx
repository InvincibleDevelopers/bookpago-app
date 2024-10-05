import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import Spacer from '../Spacer';
import {colors} from '@src/constants';

interface ApplicantCardProps {
  onPress: (kakaoId: number) => void;
  kakaoId: number;
  nickname: string;
  profileUrl: string;
  disabled?: boolean;
}

const ApplicantCard = ({
  onPress,
  kakaoId,
  nickname,
  profileUrl,
  disabled = true,
}: ApplicantCardProps) => {
  return (
    <TouchableOpacity style={styles.container} disabled>
      <Text style={styles.nicknameText}>{nickname}</Text>
      <Spacer height={20} />
      <Image
        style={styles.profileImage}
        resizeMode="cover"
        source={require('@src/assets/user/profile.png')}
      />
      <Spacer height={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    alignItems: 'center',
  },
  nicknameText: {
    color: colors.BLACK,
    fontSize: 17,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
});

export default ApplicantCard;
