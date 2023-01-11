import { createSlice } from '@reduxjs/toolkit';

const initState = {
  images: [],
  imageFormats: []
};

export const stateSlice = createSlice({
  name: 'sate',
  initialState: initState,
  reducers: {
    setStateData: (state, {payload}) => {
      const {images, imageFormats} = payload;
      state.images = images;
      state.imageFormats = imageFormats;
    }
  }
});
