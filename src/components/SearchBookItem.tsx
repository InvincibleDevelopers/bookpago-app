import {BookItem} from '@src/types';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Line from './Line';
import CustomText from './CustomText';
import {colors} from '@src/constants/colors';

interface SearchBookItemProps {
  item: BookItem;
  index: number;
  onToggleFavorite: (arg: {isbn: number; isFavorite: boolean}) => void;
  openDetail: (arg: BookItem) => void;
}

const SearchBookItem = ({
  item,
  index,
  onToggleFavorite,
  openDetail,
}: SearchBookItemProps) => {
  return (
    <Pressable onPress={() => openDetail(item)}>
      <View style={styles.itemBox}>
        <Line
          style={{
            position: 'absolute',
            alignItems: 'center',
            top: 0,
            left: 10,
            right: 10,
          }}
        />
        <View style={styles.itemImageBox}>
          <Image
            style={{width: 68, height: 103, borderRadius: 3}}
            source={{uri: item.image}}
            onError={() => {
              console.log('이미지 불러오기 실패');
            }}
          />
        </View>
        <View style={styles.itemDetailBox}>
          <View style={styles.itemDescBox}>
            <View style={styles.itemTitleBox}>
              <CustomText style={{fontSize: 14, marginBottom: 7}}>
                {item.title + index}
              </CustomText>
              <CustomText
                style={{
                  fontSize: 12,
                  color: colors.GRAY_300,
                }}>
                {item.author}
              </CustomText>
            </View>
            <View>
              <Pressable
                onPress={() =>
                  onToggleFavorite({
                    isbn: item.isbn,
                    isFavorite: true,
                  })
                }>
                {/* <Image /> */}
                <Text>버튼</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.itemHashtagBox}>
            <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
              #판타지
            </CustomText>
            <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
              #모험
            </CustomText>
            <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
              #베스트셀러
            </CustomText>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  itemImageBox: {
    marginRight: 16,
  },
  itemDetailBox: {
    flex: 1,
    marginTop: 10,
  },
  itemDescBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemTitleBox: {
    marginBottom: 20,
  },
  itemHashtagBox: {
    flexDirection: 'row',
    color: colors.GRAY,
  },
});

export default SearchBookItem;
