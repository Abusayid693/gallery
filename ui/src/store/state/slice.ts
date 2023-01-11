import { createSlice } from '@reduxjs/toolkit';

const initState = {
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
      const {isFiltered = true, isGrouped = true, data} = payload;

      state.filteredImages = {
        isFiltered,
        isGrouped,
        data
      };
    }
  }
});
