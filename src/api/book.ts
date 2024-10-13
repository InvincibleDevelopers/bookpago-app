import {BookDetail, BookItem} from '@src/types';
import fetcher from './axios';
import {REVIEW_PAGE_SIZE, SEARCH_PAGE_SIZE} from '@src/constants';

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

export const getRecommendBooks = async (kakaoId: number, size: number) => {
  const response = await fetcher.get<{
    total: number;
    books: BookItem[];
  }>(`/books/recommend?kakaoId=${kakaoId}&size=${size}`);

  return response.data;
};

export type ReviewItem = {
  id: number;
  content: string;
  rating: number;
  nickname: string;
  isLiked: boolean;
  likes: number;
  profileImage?: string | null;
};

export const getReview = async (
  isbn: number,
  kakaoId: number,
  page: number,
) => {
  const response = await fetcher.get<ReviewItem[]>(
    `/review/${isbn}?kakaoId=${kakaoId}&page=${
      page <= 0 ? 0 : page - 1
    }&size=${REVIEW_PAGE_SIZE}`,
  );

  return response.data;
};

export type PostReviewBody = {
  isbn: number;
  rating: number;
  kakaoId: number;
  content: string;
};

export const postReview = async (body: PostReviewBody) => {
  const response = await fetcher.post<{
    reviewId: number;
  }>(`/books/${body.isbn}`, body);
  return response.data;
};

export type PostToggleReviewLikesBody = {
  reviewId: number;
  myKakaoId: number;
};

export const postToggleReviewLikes = async (
  body: PostToggleReviewLikesBody,
) => {
  const response = await fetcher.post(`/review/likes`, {
    kakaoId: body.myKakaoId,
    reviewId: body.reviewId,
  });
  return response.data;
};
