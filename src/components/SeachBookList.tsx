import CustomText from '@src/components/CustomText';
import {colors} from '@src/constants/colors';
import {BookItem} from '@src/types';
import {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SearchBookItem from './SearchBookItem';

interface SearchBookListProps {
  isLoading: boolean;
  search: string;
  data: BookItem[];
  nonce: number;
  onToggleFavorite: (arg: {isbn: number; isFavorite: boolean}) => void;
  openDetail: (arg: BookItem) => void;
  onRefresh: () => void;
  onEndReached: () => void;
  error: Error | null;
}

const SearchBookList = ({
  isLoading,
  search,
  data,
  nonce,
  onToggleFavorite,
  openDetail,
  onRefresh,
  onEndReached,
  error,
}: SearchBookListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(() => true);
    onRefresh();
    setIsRefreshing(() => false);
  };

  const renderItem = useCallback(
    ({item, index}: {item: BookItem; index: number}) => {
      return (
        <SearchBookItem
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
    return <CustomText>{error.message}</CustomText>;
  }

  if (nonce === 0) {
    // 검색하기 전
    return null;
  }

  if (isLoading) {
    // 검색중
    return (
      <View>
        <CustomText>로딩중...</CustomText>
      </View>
    );
  }

  if (nonce > 0 && data.length === 0) {
    // 검색 결과가 없을때
    return (
      <View>
        <CustomText>검색 결과가 없습니다.</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchResult}>
        <CustomText style={{fontSize: 14}}>'</CustomText>
        <CustomText style={{fontSize: 14, color: colors.THEME}}>
          {search}
        </CustomText>
        <CustomText style={{fontSize: 14, marginRight: 7}}>'</CustomText>
        <CustomText
          style={{fontSize: 14}}>{`검색 결과(${data.length})`}</CustomText>
      </View>
      <FlatList
        keyExtractor={(item, index) => item.isbn.toString() + index}
        renderItem={renderItem}
        data={data}
        contentContainerStyle={styles.listBox}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={onEndReached}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchResult: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listBox: {
    backgroundColor: colors.WHITE,
  },
});

export default memo(SearchBookList);
