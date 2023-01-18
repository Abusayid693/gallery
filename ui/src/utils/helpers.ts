import { store } from '../store/index';

export const getSlicedString = (s: string) => {
  if (s.length < 9) return s;
  return s.slice(0, 8) + '....';
};

export const getFormattedData = (state?:any): any[] => {
  const sate = state ? state : store.getState().sate;

  if (!sate.filteredImages.isFiltered) return sate.images;
  // @ts-ignore
  if (!sate.filteredImages.isGrouped) return sate.filteredImages.data;
  let arr = [];
  Object.keys(sate.filteredImages.data).forEach(key => {
    arr = [...arr, ...sate.filteredImages.data[key]];
  });

  return arr;
};
