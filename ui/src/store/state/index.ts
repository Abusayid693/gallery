import { stateSlice } from './slice';

export const {
  setStateData,
  setFilterData,
  setImageFormatFilter,
  setInitialImageFormats,
  setSortSortByFilter,
  setSortGroupByFilter
} = stateSlice.actions;

export default stateSlice.reducer;
