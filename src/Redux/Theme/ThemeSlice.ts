import { createSlice } from "@reduxjs/toolkit";

type ThemeStateType = {
  theme: string;
};

export type ThemeType = {
  theme: ThemeStateType;
};

const initialState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state: ThemeStateType) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
