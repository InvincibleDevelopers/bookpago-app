import {post} from '@src/api/axios';
import {BookDetail, BookItem} from '@src/types';
import {useMutation, useQueryClient} from '@tanstack/react-query';

const useBookFavorite = (kakaoId: number | null) => {
  if (!kakaoId) {
    throw new Error('useBookFavorite: kakaoId is required');
  }
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (arg: {isbn: number; isFavorite: boolean}) => {
      if (mutation.isPending) return;
      const result = await post({
        path: `/books/${arg.isbn}/likes`,
        body: {kakaoId},
      });
      return result;
    },
    onMutate: arg => {
      queryClient.setQueriesData<BookDetail>(
        {queryKey: ['/books/:isbn']},
        pre => {
          if (!pre) return pre;
          pre.wishBook = !arg.isFavorite;
        },
      );
      queryClient.setQueriesData<{
        pages: {books: BookItem[]; total: number}[];
        pageParams: number[];
      }>({queryKey: ['/books/search']}, pre => {
        if (!pre) return pre;
        const newPages = pre.pages.map(page => {
          return page.books.map(book => {
            if (book.isbn === arg.isbn) {
              book.wishBook = !arg.isFavorite;
            }
            return book;
          });
        });
        return {...pre, books: newPages};
      });
    },
    onError: (_error, arg) => {
      queryClient.setQueriesData<BookDetail>(
        {queryKey: ['/books/:isbn']},
        pre => {
          if (!pre) return pre;
          pre.wishBook = arg.isFavorite;
        },
      );
      queryClient.setQueriesData<{
        pages: {books: BookItem[]; total: number}[];
        pageParams: number[];
      }>({queryKey: ['/books/search']}, pre => {
        if (!pre) return pre;
        const newPages = pre.pages.map(page => {
          return page.books.map(book => {
            if (book.isbn === arg.isbn) {
              book.wishBook = !arg.isFavorite;
            }
            return book;
          });
        });
        return {...pre, books: newPages};
      });
    },
  });

  return mutation;
};

export default useBookFavorite;
