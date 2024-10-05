import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import LoadingView from '@src/components/LoadingView';
import NodataView from '@src/components/NodataView';
import SearchHeader from '@src/components/common/header/SearchHeader';
import BookItem from '@src/components/search/BookItem';
import SearchResult from '@src/components/search/Result';
import {SEARCH_PAGE_SIZE, colors} from '@src/constants';
import ErrorScreen from '@src/screens/ErrorScreen';
import {BookItem as BookItemType, SearchStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useCallback, useContext, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

type Props = NativeStackScreenProps<SearchStackParamList, 'Main'>;

const SearchScreen = ({navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [nonce, setNonce] = useState(0); // 검색 버튼을 누른 횟수

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {kakaoId} = useContext(MainContext);

  const searchQuery = useInfiniteQuery<
    {total: number; books: BookItemType[]},
    {error: string}
  >({
    queryKey: ['/books/search', searchValue, nonce],
    queryFn: async ({pageParam}) => {
      const body: {books: BookItemType[]; total: number} = await get({
        path: `/books/search?query=${searchValue}&page=${pageParam}&size=${SEARCH_PAGE_SIZE}&kakaoId=${kakaoId}`,
      });
      return body;
    },
    enabled: nonce !== 0, // 검색 버튼을 누르기 전까지는 쿼리를 실행하지 않음
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage, _lastPageParam, _allPageParams) => {
      // 마지막 페이지가 PAGE_SIZE만큼 데이터를 가지고 있으면 다음 페이지를 요청
      return lastPage.books.length === SEARCH_PAGE_SIZE
        ? allPage.length + 1
        : undefined;
    },
  });

  const onChangeText = (text: string) => {
    setInputValue(() => text.replace('\n', '')); // 개행문자 제거
  };

  const onSearch = () => {
    Keyboard.dismiss();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) {
      Alert.alert('검색어를 입력해주세요.');
      return;
    }
    setSearchValue(() => trimmedInput);
    setNonce(pre => pre + 1); //refetch와 동일한 효과
  };

  const handleRefresh = () => {
    setIsRefreshing(() => true);
    onSearch();
    setIsRefreshing(() => false);
  };

  const openDetail = (item: BookItemType) => {
    navigation.navigate('BookDetail', {isbn: item.isbn});
  };

  const onEndReached = () => {
    if (searchQuery.hasNextPage && !searchQuery.isFetchingNextPage) {
      searchQuery.fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({item}: {item: BookItemType}) => {
      return (
        <BookItem
          item={item}
          // onToggleFavorite={onToggleFavorite}
          openDetail={openDetail}
        />
      );
    },
    [openDetail],
  );

  const bookItemList = useMemo(
    () => searchQuery.data?.pages.map(d => d.books).flat() || [],
    [searchQuery.data],
  );

  const total = searchQuery.data?.pages.at(-1)?.total;

  if (searchQuery.error) {
    const error = searchQuery.error as unknown as {error: string};
    return <ErrorScreen errorMessage={error.error} />;
  }

  if (nonce === 0) {
    // 검색하기 전
    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchHeader
          aiButtonType="book"
          value={inputValue}
          onChangeText={onChangeText}
          onPressBack={() => navigation.goBack()}
          onPressSearch={onSearch}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          multiline={false}
        />
      </SafeAreaView>
    );
  }

  if (searchQuery.isPending) {
    // 검색중
    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchHeader
          aiButtonType="book"
          value={inputValue}
          onChangeText={onChangeText}
          onPressBack={() => navigation.goBack()}
          onPressSearch={onSearch}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          multiline={false}
        />
        <LoadingView />
      </SafeAreaView>
    );
  }

  if (nonce > 0 && bookItemList.length === 0) {
    // 검색 결과가 없을때
    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchHeader
          aiButtonType="book"
          value={inputValue}
          onChangeText={onChangeText}
          onPressBack={() => navigation.goBack()}
          onPressSearch={onSearch}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          multiline={false}
        />
        <NodataView text="검색 결과가 없습니다." />;
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={
          <>
            <SearchHeader
              aiButtonType="book"
              value={inputValue}
              onChangeText={onChangeText}
              onPressBack={() => navigation.goBack()}
              onPressSearch={onSearch}
              onSubmitEditing={onSearch}
              returnKeyType="search"
              multiline={false}
            />
            <SearchResult total={total || 0}>{searchValue}</SearchResult>
          </>
        }
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => item.isbn.toString() + index}
        renderItem={renderItem}
        data={bookItemList}
        contentContainerStyle={styles.list}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        scrollIndicatorInsets={{right: 1}} //ios 스크롤바 버그방지
        overScrollMode="never" // Android
        bounces={false} // iOS
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: colors.WHITE,
  },
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
});

export default SearchScreen;
