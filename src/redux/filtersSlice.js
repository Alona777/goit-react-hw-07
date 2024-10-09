import { createSlice } from "@reduxjs/toolkit";
// export const filteredContacts = (state) => state.filters.name;

const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    setFilteredContacts(state, action) {
      state.name = action.payload;
    },
  },
});
export const { setFilteredContacts } = slice.actions;

export default slice.reducer;
