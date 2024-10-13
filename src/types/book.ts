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
  wishBook: boolean;
}
