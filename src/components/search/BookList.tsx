import CustomText from '@src/components/CustomText';
import {colors} from '@src/constants/colors';
import {BookItem as BookItemType} from '@src/types';
import {memo, useCallback, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import BookItem from './BookItem';

interface BookListProps {
  isLoading: boolean;
  search: string;
  total?: number;
  bookItemList: BookItemType[];
  nonce: number;
  onToggleFavorite: (arg: {isbn: number; isFavorite: boolean}) => void;
  openDetail: (arg: BookItemType) => void;
  onRefresh: () => void;
  onEndReached: () => void;
  error: {error: string} | null;
}

const BookList = ({
  isLoading,
  search,
  total,
  bookItemList,
  nonce,
  onToggleFavorite,
  openDetail,
  onRefresh,
  onEndReached,
  error,
}: BookListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(() => true);
    onRefresh();
    setIsRefreshing(() => false);
  };

  const renderItem = useCallback(
    ({item, index}: {item: BookItemType; index: number}) => {
      return (
        <BookItem
          item={item}
          index={index}
          onToggleFavorite={onToggleFavorite}
          openDetail={openDetail}
        />
      );
    },
    [onToggleFavorite, openDetail],
  );

  if (error) {
    return (
      <View style={styles.container}>
        <CustomText style={styles.messageText}>{error.error}</CustomText>
      </View>
    );
  }

  if (nonce === 0) {
    // 검색하기 전
    return <View style={styles.container}></View>;
  }

  if (isLoading) {
    // 검색중
    return (
      <View style={styles.container}>
        <CustomText style={styles.messageText}>로딩중...</CustomText>
      </View>
    );
  }

  if (nonce > 0 && bookItemList.length === 0) {
    // 검색 결과가 없을때
    return (
      <View style={styles.container}>
        <View style={styles.nodataBox}>
          <Image
            style={{
              width: Dimensions.get('screen').width * 0.5,
              height: Dimensions.get('screen').width * 0.5,
            }}
            source={require('@src/assets/logo/logo-translucent.png')}
            resizeMode="center"
          />
          <CustomText style={styles.messageText}>
            해당 검색어에 맞는 책이 없어요
          </CustomText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <CustomText style={{fontSize: 14}} numberOfLines={1}>
          '
          <CustomText style={{fontSize: 14, color: colors.THEME}}>
            {search}
          </CustomText>
          '{` 검색 결과(${total})`}
        </CustomText>
      </View>
      <FlatList
        keyExtractor={(item, index) => item.isbn.toString() + index}
        renderItem={renderItem}
        data={bookItemList}
        contentContainerStyle={styles.list}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        scrollIndicatorInsets={{right: 1}} //ios 스크롤바 버그방지
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  list: {
    backgroundColor: colors.WHITE,
  },
  nodataBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
});

export default memo(BookList);
