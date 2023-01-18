import { filtersSlice } from './slice';

export const {
  setImageFormatFilter,
  setInitialImageFormats,
  setSortSortByFilter,
  setSortGroupByFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;
