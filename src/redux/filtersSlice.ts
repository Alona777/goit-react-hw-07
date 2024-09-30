import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


interface FilterState {
  name: string;
}


const initialState: FilterState = {
  name: "",
};


const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {

    changeFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});


export const { changeFilter } = filtersSlice.actions;


export const selectNameFilter = (state: RootState) => state.filters.name;


export default filtersSlice.reducer;
