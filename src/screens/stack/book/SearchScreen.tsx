import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import DismissKeyboardView from '@src/components/DismissKeyboardView';
import SearchBookList from '@src/components/SeachBookList';
import SearchHeader from '@src/components/SearchHeader';
import {BookItem, SearchScreens} from '@src/types';
import {waitfor} from '@src/utils/waitfor';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {Keyboard, SafeAreaView} from 'react-native';

type Props = NativeStackScreenProps<SearchScreens>;

const SearchScreen = ({navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [nonce, setNonce] = useState(0); // 검색 버튼을 누른 횟수

  const queryClient = useQueryClient();

  const {data, isPending} = useQuery({
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
    setSearchValue(() => inputValue.trim());
    setNonce(pre => pre + 1);
  };

  const openDetail = (item: BookItem) => {
    navigation.navigate('Detail', {props: item});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <DismissKeyboardView>
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
        <SearchBookList
          isLoading={isPending}
          data={data || []}
          search={searchValue}
          nonce={nonce}
          onToggleFavorite={mutate.mutate}
          openDetail={openDetail}
        />
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default SearchScreen;
