import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import DismissKeyboardView from '@src/components/DismissKeyboardView';
import BookList from '@src/components/search/BookList';
import SearchHeader from '@src/components/SearchHeader';
import {BookItem, SearchScreens} from '@src/types';
import {waitfor} from '@src/utils/waitfor';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {useState} from 'react';
import {Alert, Keyboard, SafeAreaView} from 'react-native';

type Props = NativeStackScreenProps<SearchScreens, 'Main'>;

const PAGE_SIZE = 20;

const MainScreen = ({navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [nonce, setNonce] = useState(0); // 검색 버튼을 누른 횟수

  const queryClient = useQueryClient();

  const query = useInfiniteQuery<BookItem[], {error: string}>({
    queryKey: ['book', searchValue, nonce],
    queryFn: async ({pageParam = 1}) => {
      const body: {books: BookItem[]} = await get({
        path: `/books/search?query=${searchValue}&page=${pageParam}&size=${PAGE_SIZE}`,
      });
      if (pageParam === 3) {
        return [];
      }
      return body.books;
    },
    enabled: nonce !== 0, // 검색 버튼을 누르기 전까지는 쿼리를 실행하지 않음
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage, lastPageParam, allPageParams) => {
      // 마지막 페이지가 PAGE_SIZE만큼 데이터를 가지고 있으면 다음 페이지를 요청
      return lastPage.length === PAGE_SIZE ? allPage.length + 1 : undefined;
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

  const openDetail = (item: BookItem) => {
    navigation.navigate('Detail', {props: item});
  };

  const onEndReached = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

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
          isLoading={query.isPending}
          data={query.data?.pages.flat() || []}
          search={searchValue}
          nonce={nonce}
          onToggleFavorite={mutate.mutate}
          openDetail={openDetail}
          onRefresh={onSearch}
          onEndReached={onEndReached}
          error={query.error}
        />
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default MainScreen;
