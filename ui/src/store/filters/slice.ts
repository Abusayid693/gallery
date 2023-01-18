import { createSlice } from '@reduxjs/toolkit';
import { GROUP_BY_TYPES, SORT_BY_NAME, SORT_BY_TYPES } from './types';

const initState: {
    imageFormats: {};
    sortBy: SORT_BY_TYPES;
    groupBy: GROUP_BY_TYPES | null;
} = {
  imageFormats: {},
  sortBy: SORT_BY_NAME,
  groupBy: null
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initState,
  reducers: {
    setInitialImageFormats: (state, {payload}) => {
      const {imageFormats} = payload;
      state.imageFormats = imageFormats;
    },

    setImageFormatFilter: (state, {payload}) => {
      const key = payload;
      state.imageFormats[key] = !state.imageFormats[key];
    },

    setSortSortByFilter: (state, {payload}) => {
      const key = payload;
      state.sortBy = key;
    },

    setSortGroupByFilter: (state, {payload}) => {
      const key = payload;
      state.groupBy = key;
    }
  }
});
