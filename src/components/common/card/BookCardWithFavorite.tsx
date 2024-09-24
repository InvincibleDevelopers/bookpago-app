import {Image, StyleSheet, View} from 'react-native';
import CustomText from '../../CustomText';
import {colors} from '@src/constants';
import {useState} from 'react';
import ToggleStar from '../button/ToggleStar';

interface BookCardWithFavoriteProps {
  isbn: number;
  isFavorite: boolean;
  onToggleFavorite: (isbn: number) => void;
  onPress: (isbn: number) => void;
}

const BookCardWithFavorite = ({
  isbn,
  isFavorite,
  onToggleFavorite,
  onPress,
}: BookCardWithFavoriteProps) => {
  const [v, s] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={{width: 130, height: 195, borderRadius: 3}}
          source={{
            uri: 'https://shopping-phinf.pstatic.net/main_3250690/32506900732.20230620100615.jpg',
          }}
        />
        <ToggleStar
          style={styles.toggleStar}
          isActive={v}
          onPress={() => s(p => !p)}
        />
      </View>
      <CustomText style={{fontSize: 14, marginBottom: 7}} numberOfLines={1}>
        책 제목
      </CustomText>
      <CustomText
        style={{fontSize: 12, color: colors.GRAY_300}}
        numberOfLines={1}>
        작가
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageBox: {
    position: 'relative',
    marginBottom: 7,
  },
  toggleStar: {
    position: 'absolute',
    left: 5,
    bottom: 15,
  },
});

export default BookCardWithFavorite;
