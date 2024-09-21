export interface BookItem {
  isbn: number;
  title: string;
  author: string;
  image: string;
}

export interface BookDetail extends BookItem {
  description: string;
  publisher: string;
  pubdate: string;
  average_rating: number;
}

export interface RecentBookProps {
  path: string;
  title: string;
  detail: string;
}
