import {StyleSheet, TouchableOpacity, Image} from 'react-native';

interface ProfileImageButtonProps {
  onLongPress?: () => void;
  disabled?: boolean;
  imageUri?: string;
}

const ProfileImageButton = ({
  onLongPress,
  disabled = true,
  imageUri,
}: ProfileImageButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.profileImageButton}
      onLongPress={onLongPress}
      disabled={disabled}>
      <Image
        style={styles.profileImage}
        resizeMode="cover"
        source={
          imageUri ? {uri: imageUri} : require('@src/assets/user/profile.png')
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImageButton: {
    position: 'absolute',
    top: -50,
    left: 20,
    borderRadius: 9999,
    overflow: 'hidden',
    width: 100,
    height: 100,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileImageButton;
