import { createSlice } from '@reduxjs/toolkit';
import { GROUP_BY_TYPES, SORT_BY_NAME, SORT_BY_TYPES } from './types';

const initState: {
  filters: {
    imageFormats: Record<string, boolean>;
    sortBy: SORT_BY_TYPES;
    groupBy: GROUP_BY_TYPES | null;
  };
  isFetched: boolean;
  images: any[];
  filteredImages: {
    isGrouped: boolean;
    data: any[] | Record<string, any[]>;
  };
} = {
  filters: {
    imageFormats: {},
    sortBy: SORT_BY_NAME,
    groupBy: null
  },
  isFetched: false,
  images: [],
  /**
   * All image formats sent from socket eg: [svg, png....]
   */
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

      const obj = {};
      imageFormats?.forEach(format => (obj[format] = true));

      state.images = images;
      state.filters.imageFormats = obj;
      state.filteredImages.data = images;
      state.isFetched = true;
    },

    setFilterData: (state, {payload}) => {
      const {isGrouped, data} = payload;
      console.log('setFilterData :', data, isGrouped);

      state.filteredImages = {
        isGrouped,
        data
      };
    },
    /**
     * Add a new file in images and update imageFormats if new image 
     * image format added
     */
    addNewFile: (state, {payload}) => {
      const {data} = payload;

      state.images = [...state.images, data];
      state.filters.imageFormats = {...state.filters.imageFormats, [data.type]: true};
    },
    /**
     * Update state when existing file is deleted 
     */
    deleteExistingFile: (state, {payload})=>{
      const {path} = payload;
      state.images = state.images.filter((image)=> image.path !== path)
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
