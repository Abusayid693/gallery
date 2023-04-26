import { stateSlice } from './slice';

export const {
  setStateData,
  setFilterData,
  setImageFormatFilter,
  setSortSortByFilter,
  setSortGroupByFilter,
  addNewFile,
  deleteExistingFile,
  updateExistingFile
} = stateSlice.actions;

export default stateSlice.reducer;
