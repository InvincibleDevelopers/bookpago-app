import {colors} from '@src/constants';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import CustomText from '../../CustomText';
import ToggleStar from '../button/ToggleStar';

interface BookCardWithFavoriteProps {
  isbn: number;
  image: string;
  author?: string;
  title?: string;
  isShowFavorite?: boolean;
  isFavorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: (isbn: number) => void;
  style?: StyleProp<ViewStyle>;
}

const BookCard = ({
  isbn,
  image,
  author,
  title,
  isFavorite = false,
  isShowFavorite = false,
  onToggleFavorite,
  onPress,
  style,
}: BookCardWithFavoriteProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <View style={styles.imageBox}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: image}}
            resizeMode="cover"
          />
          {isShowFavorite && (
            <ToggleStar
              style={styles.toggleStar}
              isActive={isFavorite}
              onPress={() => onToggleFavorite?.(isbn)}
            />
          )}
        </View>
        {title !== undefined && (
          <CustomText style={{fontSize: 14, marginBottom: 7}} numberOfLines={1}>
            {title}
          </CustomText>
        )}
        {author !== undefined && (
          <CustomText
            style={{fontSize: 12, color: colors.GRAY_300}}
            numberOfLines={1}>
            {author}
          </CustomText>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
  },
  imageBox: {
    position: 'relative',
    aspectRatio: 1 / 1.5,
    marginBottom: 7,
    borderRadius: 3,
    width: '100%',
  },
  toggleStar: {
    position: 'absolute',
    left: 5,
    bottom: 15,
  },
});

export default BookCard;
