import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import DismissKeyboardView from '@src/components/DismissKeyboardView';
import BookList from '@src/components/search/BookList';
import SearchHeader from '@src/components/SearchHeader';
import {BookItem, SearchScreens} from '@src/types';
import {waitfor} from '@src/utils/waitfor';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {Alert, Keyboard, SafeAreaView} from 'react-native';

type Props = NativeStackScreenProps<SearchScreens, 'Main'>;

const MainScreen = ({navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [nonce, setNonce] = useState(0); // 검색 버튼을 누른 횟수

  const queryClient = useQueryClient();

  const {data, isPending, error} = useQuery<BookItem[], {error: string}>({
    queryKey: ['book', searchValue, nonce],
    queryFn: async () => {
      const body: {books: BookItem[]} = await get({
        path: `/books/search?query=${searchValue}&page=1&size=50`,
      });
      return body.books;
    },
    retry: 1,
    enabled: nonce !== 0,
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

  const onSearch = () => {
    Keyboard.dismiss();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) {
      Alert.alert('검색어를 입력해주세요.');
      return;
    }
    setSearchValue(() => inputValue);
    setNonce(pre => pre + 1);
  };

  const openDetail = (item: BookItem) => {
    navigation.navigate('Detail', {props: item});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <DismissKeyboardView style={{flex: 1}}>
        <SearchHeader
          isShowAiButton
          aiButtonType="book"
          onChangeText={setInputValue}
          onPressBack={() => navigation.goBack()}
          onPressAi={() => console.log('ai')}
          onPressSearch={onSearch}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
        <BookList
          isLoading={isPending}
          data={data || []}
          search={searchValue}
          nonce={nonce}
          onToggleFavorite={mutate.mutate}
          openDetail={openDetail}
          onRefresh={onSearch}
          onEndReached={() => {
            console.log('onEndReached');
          }}
          error={error}
        />
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default MainScreen;
