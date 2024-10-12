import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface KaKaoButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

const KaKaoButton = ({onPress, disabled = false}: KaKaoButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}>
      <Image
        source={require('@src/assets/icons/kakao.png')}
        style={styles.image}
        resizeMode="center"
      />
      <Text style={styles.label}>카카오 로그인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FEE500',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: 150,
  },
  image: {
    width: 16,
    height: 16,
  },
  label: {
    color: '#191919',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default KaKaoButton;
