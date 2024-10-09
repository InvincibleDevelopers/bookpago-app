import {postToggleLikes} from '@src/api/book';
import {BookDetail} from '@src/types';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';

const useBookFavorite = (kakaoId: number | null) => {
  if (!kakaoId) {
    throw new Error('useBookFavorite: kakaoId is required');
  }
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onMutate: arg => {
      queryClient.setQueriesData<BookDetail>(
        {queryKey: ['/books/:isbn']},
        pre => {
          if (!pre) return pre;
          pre.wishBook = !arg.isFavorite;
        },
      );
    },
    mutationFn: async (arg: {isbn: number; isFavorite: boolean}) => {
      const result = await postToggleLikes(arg.isbn, kakaoId);
      return result;
    },
    onError: async error => {
      await queryClient.invalidateQueries({queryKey: ['/books/:isbn']});
      Alert.alert('즐겨찾기 실패', error.message);
    },
  });

  return mutation;
};

export default useBookFavorite;

// queryClient.setQueriesData<{
//   pages: {books: BookItem[]; total: number}[];
//   pageParams: number[];
// }>({queryKey: ['/books/search']}, pre => {
//   if (!pre) return pre;
//   const newPages = pre.pages.map(page => {
//     return page.books.map(book => {
//       if (book.isbn === arg.isbn) {
//         book.wishBook = !arg.isFavorite;
//       }
//       return book;
//     });
//   });
//   return {...pre, books: newPages};
// });
