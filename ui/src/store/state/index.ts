import { stateSlice } from './slice';

export const {
  setStateData,
  setFilterData,
  setImageFormatFilter,
  setSortSortByFilter,
  setSortGroupByFilter
} = stateSlice.actions;

export default stateSlice.reducer;
