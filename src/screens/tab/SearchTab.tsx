import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import DismissKeyboardView from '@src/components/DismissKeyboardView';
import SearchBookList from '@src/components/SeachBookList';
import SearchHeader from '@src/components/SearchHeader';
import {MainTabs, SearchBookItem} from '@src/types';
import {waitfor} from '@src/utils/waitfor';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {Keyboard, SafeAreaView} from 'react-native';

const DUMMY_DATA: SearchBookItem[] = new Array(50).fill({
  isbn: 9788983925534,
  title: '해리포터: 죽음의 성물 4 (개정판)',
  author: 'J.K. 롤링',
  image:
    'https://shopping-phinf.pstatic.net/main_3244151/32441513924.20220527051448.jpg',
  description:
    '국내 출간 15주년을 맞아 새롭게 선보이는 해리포터 시리즈!\n\n선과 악의 대립 속에서 평범한 어린 소년이 한 사람의 영웅으로 성장해나가는 보편적인 테마를 바탕으로 빈틈없는 소설적 구성과 생생하게 살아 있는 캐릭터, 정교하게 만들어낸 환상의 세계를 접목시킨 21세기의 고전 「해리포터 시리즈」가 국내 출간 15주년을 맞았다. 이를 기념해 표지 일러스트를 교체하고 그간 지적되어 온 번역 오류 등을 꼼꼼하게 감수하고 면밀하게 검토해 수정하였고 원서의 다양한 서체를 최대한 반영해 몰입감을 높여 새롭게 시리즈를 펴냈다...',
  publisher: '문학수첩',
  pubdate: '20141218',
  average_rating: 0,
});

type Props = BottomTabScreenProps<MainTabs, 'Search'>;

const SearchTab = ({navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [enabled, setEnabled] = useState(false);

  const queryClient = useQueryClient();

  const {data, isPending} = useQuery({
    queryKey: ['book', searchValue],
    queryFn: async () => {
      console.log('query activated');
      await waitfor(2000);
      return DUMMY_DATA;
    },
    enabled,
  });

  const mutate = useMutation({
    mutationFn: async (arg: {isbn: number; isFavorite: boolean}) => {
      await waitfor(2000);
      return !arg.isFavorite;
    },
    onMutate: arg => {
      // Optimistic Update
      queryClient.setQueryData<SearchBookItem[]>(
        ['book', searchValue],
        prev => {
          if (!prev) return prev;
          return prev.map(i => i);
        },
      );
    },
    onError: (error, arg) => {
      // Rollback
    },
  });

  const onSearch = () => {
    Keyboard.dismiss();
    setSearchValue(() => inputValue.trim());
    setEnabled(() => true);
  };

  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <SearchHeader
          isShowAiButton
          aiButtonType="book"
          onChangeText={setInputValue}
          onPressBack={() => {
            console.log('back');
            navigation.goBack();
          }}
          onPressAi={() => console.log('ai')}
          onPressSearch={onSearch}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
        <SearchBookList
          isLoading={isPending}
          data={data || []}
          search={searchValue}
          enabled={enabled}
          onToggleFavorite={mutate.mutate}
        />
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default SearchTab;
