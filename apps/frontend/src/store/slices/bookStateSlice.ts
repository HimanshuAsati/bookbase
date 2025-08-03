import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../../../../../packages/types/src/book"; // Adjust this path if needed

interface BookState {
  selectedBook: Book | null;
}

const initialState: BookState = {
  selectedBook: null,
};

const bookStateSlice = createSlice({
  name: "bookState",
  initialState,
  reducers: {
    setSelectedBook(state, action: PayloadAction<Book>) {
      state.selectedBook = action.payload;
    },
    clearSelectedBook(state) {
      state.selectedBook = null;
    },
  },
});

export const { setSelectedBook, clearSelectedBook } = bookStateSlice.actions;
export default bookStateSlice.reducer;
