import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import DismissKeyboardView from '@src/components/DismissKeyboardView';
import BookList from '@src/components/search/BookList';
import SearchHeader from '@src/components/SearchHeader';
import {SEARCH_PAGE_SIZE} from '@src/constants';
import useAPI from '@src/hooks/useAPI';
import {BookDetail, BookItem, SearchScreens} from '@src/types';
import {waitfor} from '@src/utils/waitfor';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {useMemo, useState} from 'react';
import {Alert, findNodeHandle, Keyboard, SafeAreaView} from 'react-native';

type Props = NativeStackScreenProps<SearchScreens, 'Main'>;

const MainScreen = ({navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [nonce, setNonce] = useState(0); // 검색 버튼을 누른 횟수
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);

  const queryClient = useQueryClient();

  const searchQuery = useInfiniteQuery<
    {total: number; books: BookItem[]},
    {error: string}
  >({
    queryKey: ['/books/search', searchValue, nonce],
    queryFn: async ({pageParam = 1}) => {
      const body: {books: BookItem[]; total: number} = await get({
        path: `/books/search?query=${searchValue}&page=${pageParam}&size=${SEARCH_PAGE_SIZE}`,
      });
      return body;
    },
    enabled: nonce !== 0, // 검색 버튼을 누르기 전까지는 쿼리를 실행하지 않음
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage, lastPageParam, allPageParams) => {
      // 마지막 페이지가 PAGE_SIZE만큼 데이터를 가지고 있으면 다음 페이지를 요청
      return lastPage.books.length === SEARCH_PAGE_SIZE
        ? allPage.length + 1
        : undefined;
    },
  });

  const mutate = useMutation({
    mutationFn: async (arg: {isbn: number; isFavorite: boolean}) => {
      await waitfor(2000);
      return !arg.isFavorite;
    },
    onMutate: arg => {
      // Optimistic Update
      // queryClient.setQueryData<BookItem[]>(['book', searchValue], prev => {
      //   if (!prev) {
      //     return prev;
      //   }
      //   return prev.map(i => i);
      // });
    },
    onError: (error, arg) => {
      // Rollback
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

  const openDetail = async (item: BookItem) => {
    navigation.navigate('Detail', {props: {isbn: item.isbn}});
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
      <DismissKeyboardView style={{flex: 1}}>
        <SearchHeader
          isShowAiButton
          aiButtonType="book"
          value={inputValue}
          onChangeText={onChangeText}
          onPressBack={() => navigation.goBack()}
          onPressAi={() => console.log('ai')}
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
          onToggleFavorite={mutate.mutate}
          openDetail={openDetail}
          onRefresh={onSearch}
          onEndReached={onEndReached}
          error={searchQuery.error}
        />
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default MainScreen;
