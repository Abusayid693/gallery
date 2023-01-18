import { createSlice } from '@reduxjs/toolkit';

const initState: {
  images: any[];
  imageFormats: any[];
  filteredImages: {
      isFiltered: boolean;
      isGrouped: boolean;
      data: any[] | Record<string, any[]>;
  };
} = {
  images: [],
  /**
   * All image formats sent from socket eg: [svg, png....]
   */
  imageFormats: [],
  filteredImages: {
    /**
     * If data is filtered
     */
    isFiltered: false,
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
    },

    setFilterData: (state, {payload}) => {
      const {isFiltered = true, isGrouped, data} = payload;
      console.log('setFilterData :', data, isGrouped)

      state.filteredImages = {
        isFiltered,
        isGrouped,
        data
      };
    }
  }
});
