import { createSlice } from '@reduxjs/toolkit';
import { GROUP_BY_TYPES, SORT_BY_NAME, SORT_BY_TYPES } from './types';

const initState: {
  filters:{
    imageFormats: {};
    sortBy: SORT_BY_TYPES;
    groupBy: GROUP_BY_TYPES | null;
  }
  isFetched: boolean,
  images: any[];
  imageFormats: any[];
  filteredImages: {
      isGrouped: boolean;
      data: any[] | Record<string, any[]>;
  };
} = {

  filters:{
    imageFormats: {},
    sortBy: SORT_BY_NAME,
    groupBy: null
  },
  isFetched: false,
  images: [],
  /**
   * All image formats sent from socket eg: [svg, png....]
   */
  imageFormats: [],
  filteredImages: {
    /**
     * Is true only when grouping filter is applied
     */
    isGrouped: false,
    data: []
  }
};

export const stateSlice = createSlice({
  name: 'sate',
  initialState: initState,
  reducers: {
    setStateData: (state, {payload}) => {
      const {images, imageFormats} = payload;

      state.images = images;
      state.imageFormats = imageFormats;
      state.filteredImages.data = images
      state.isFetched = true;
    },

    setFilterData: (state, {payload}) => {
      const {isGrouped, data} = payload;
      console.log('setFilterData :', data, isGrouped)

      state.filteredImages = {
        isGrouped,
        data
      };
    },

    addNewFile: (state, {payload}) =>{
      const {data} = payload;

      state.images = [] 
    },

    setInitialImageFormats: (state, {payload}) => {
      const {imageFormats} = payload;
      state.filters.imageFormats = imageFormats;
    },

    setImageFormatFilter: (state, {payload}) => {
      const key = payload;
      state.filters.imageFormats[key] = !state.filters.imageFormats[key];
    },

    setSortSortByFilter: (state, {payload}) => {
      const key = payload;
      state.filters.sortBy = key;
    },

    setSortGroupByFilter: (state, {payload}) => {
      const key = payload;
      state.filters.groupBy = key;
    }
  }
});
