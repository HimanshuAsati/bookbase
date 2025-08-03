import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookSearchState {
  query: string;
}

const initialState: BookSearchState = {
  query: "",
};

const bookSearchSlice = createSlice({
  name: "bookSearch",
  initialState,
  reducers: {
    setBookSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearBookSearchQuery(state) {
      state.query = "";
    },
  },
});

export const { setBookSearchQuery, clearBookSearchQuery } = bookSearchSlice.actions;
export default bookSearchSlice.reducer;
