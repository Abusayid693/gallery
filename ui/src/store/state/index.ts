import { stateSlice } from './slice';

export const {
  setStateData,
  setFilterData,
  setImageFormatFilter,
  setSortSortByFilter,
  setSortGroupByFilter,
  addNewFile
} = stateSlice.actions;

export default stateSlice.reducer;
