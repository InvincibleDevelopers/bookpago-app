import {BookDetail, BookItem} from '@src/types';
import fetcher from './axios';
import {SEARCH_PAGE_SIZE} from '@src/constants';

export const getBestsellers = async () => {
  const response = await fetcher.get<{books: BookItem[]; total: number}>(
    '/books/bestsellers',
  );
  return response.data.books;
};

export const getSearchBooks = async (query: string, page: number) => {
  const response = await fetcher.get<{books: BookItem[]; total: number}>(
    `/books/search?query=${query}&page=${page}&size=${SEARCH_PAGE_SIZE}`,
  );
  return response.data;
};

export const getBookByIsbn = async (isbn: number, kakaoId: number) => {
  const response = await fetcher.get<BookDetail>(
    `/books/${isbn}?kakaoId=${kakaoId}`,
  );
  return response.data;
};

export const postToggleLikes = async (isbn: number, kakaoId: number) => {
  const response = await fetcher.post(`/books/${isbn}/likes`, {kakaoId});
  return response.data;
};
