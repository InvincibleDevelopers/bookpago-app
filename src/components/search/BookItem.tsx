import {colors} from '@src/constants/colors';
import {BookItem as BookItemType} from '@src/types';
import {memo} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../CustomText';
import Divider from '../common/Divider';
import ToggleStar from '../common/button/ToggleStar';

interface BookItemProps {
  item: BookItemType;
  onToggleFavorite: (arg: {isbn: number; isFavorite: boolean}) => void;
  openDetail: (arg: BookItemType) => void;
}

const BookItem = ({item, onToggleFavorite, openDetail}: BookItemProps) => {
  return (
    <Pressable onPress={() => openDetail(item)}>
      <View style={styles.container}>
        <Divider
          style={{
            position: 'absolute',
            alignItems: 'center',
            top: 0,
            left: 10,
            right: 10,
          }}
        />
        <View style={styles.imageBox}>
          <Image
            style={{width: 68, height: 103, borderRadius: 3}}
            source={{uri: item.image}}
            onError={() => {
              console.log('이미지 불러오기 실패');
            }}
          />
        </View>
        <View style={styles.detailBox}>
          <View style={styles.descBox}>
            <View style={styles.titleBox}>
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
            </View>
            <ToggleStar
              isActive={item.wishBook}
              onPress={() =>
                onToggleFavorite({isbn: item.isbn, isFavorite: item.wishBook})
              }
            />
          </View>
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
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  imageBox: {
    marginRight: 16,
  },
  detailBox: {
    flex: 1,
    marginTop: 10,
  },
  descBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleBox: {
    marginBottom: 20,
    width: Dimensions.get('screen').width - 160,
  },
  hashtagBox: {
    flexDirection: 'row',
    color: colors.GRAY,
    gap: 7,
  },
});

export default memo(BookItem);
