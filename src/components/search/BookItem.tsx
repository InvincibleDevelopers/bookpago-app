import {colors} from '@src/constants/colors';
import {BookItem as BookItemType} from '@src/types';
import {memo} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../CustomText';
import Divider from '../common/Divider';
import ToggleStar from '../common/button/ToggleStar';
import Spacer from '../common/Spacer';

interface BookItemProps {
  item: BookItemType;
  // onToggleFavorite: (arg: {isbn: number; isFavorite: boolean}) => void;
  openDetail: (arg: BookItemType) => void;
}

const BookItem = ({item, openDetail}: BookItemProps) => {
  return (
    <Pressable style={styles.container} onPress={() => openDetail(item)}>
      <Divider
        type="horizontal"
        style={{width: Dimensions.get('screen').width - 20}}
      />

      <View style={styles.row}>
        <Image style={styles.bookImage} source={{uri: item.image}} />

        <View style={styles.detailBox}>
          <Spacer height={10} />

          <CustomText style={{fontSize: 14, marginBottom: 7}}>
            {item.title}
          </CustomText>
          <CustomText
            style={{
              fontSize: 12,
              color: colors.GRAY_300,
            }}>
            {item.author}
          </CustomText>

          <Spacer height={20} />

          {/* <ToggleStar
              isActive={item.wishBook}
              onPress={() =>
                onToggleFavorite({isbn: item.isbn, isFavorite: item.wishBook})
              }
            /> */}

          {/* <View style={styles.hashtagBox}>
            <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
              #판타지
            </CustomText>
            <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
              #모험
            </CustomText>
            <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
              #베스트셀러
            </CustomText>
          </View> */}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  bookImage: {
    marginRight: 16,
    width: 68,
    height: 103,
    borderRadius: 3,
  },
  detailBox: {
    flex: 1,
  },
  hashtagBox: {
    flexDirection: 'row',
    color: colors.GRAY,
    gap: 7,
  },
});

export default memo(BookItem);
