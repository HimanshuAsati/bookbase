
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  summary?: string;
  genre?: string;
  rating?: number;
}

export interface BookSearchResult {
  id: string;
  title: string;
  author: string;
}

export interface BookState {
  selectedBook: Book | null;
  showGrid: boolean;
}
