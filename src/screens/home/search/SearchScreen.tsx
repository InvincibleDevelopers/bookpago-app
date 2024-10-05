import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import SearchHeader from '@src/components/common/header/SearchHeader';
import BookList from '@src/components/search/BookList';
import {SEARCH_PAGE_SIZE} from '@src/constants';
import useBookFavorite from '@src/hooks/useBookFavorite';
import {BookItem, SearchStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useContext, useMemo, useState} from 'react';
import {Alert, Keyboard, SafeAreaView} from 'react-native';

type Props = NativeStackScreenProps<SearchStackParamList, 'Main'>;

const SearchScreen = ({navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [nonce, setNonce] = useState(0); // 검색 버튼을 누른 횟수
  const {kakaoId} = useContext(MainContext);

  const searchQuery = useInfiniteQuery<
    {total: number; books: BookItem[]},
    {error: string}
  >({
    queryKey: ['/books/search', searchValue, nonce],
    queryFn: async ({pageParam}) => {
      const body: {books: BookItem[]; total: number} = await get({
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

  const mutation = useBookFavorite(kakaoId!);

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

  const openDetail = async (item: BookItem) => {
    navigation.navigate('BookDetail', {isbn: item.isbn});
  };

  const onEndReached = () => {
    if (searchQuery.hasNextPage && !searchQuery.isFetchingNextPage) {
      searchQuery.fetchNextPage();
    }
  };

  const bookItemList = useMemo(
    () => searchQuery.data?.pages.map(d => d.books).flat() || [],
    [searchQuery.data],
  );

  const total = searchQuery.data?.pages.at(-1)?.total;

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
      <BookList
        isLoading={searchQuery.isPending}
        total={total}
        bookItemList={bookItemList}
        search={searchValue}
        nonce={nonce}
        onToggleFavorite={mutation.mutate}
        openDetail={openDetail}
        onRefresh={onSearch}
        onEndReached={onEndReached}
        error={searchQuery.error}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
