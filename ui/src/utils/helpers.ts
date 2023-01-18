import _ from "lodash";
import { GROUP_BY_TYPES, SORT_BY_DATE, SORT_BY_NAME, SORT_BY_SIZE, SORT_BY_TYPES } from '../components/Filter/types';
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

export const getFilteredDataByGroup = (type: GROUP_BY_TYPES, data: any[]) => {
    const result = _.mapValues(_.groupBy(data, type));
    return result;
  };

  export const getFilteredDataByImageType = (data: any[], imageFormats: Record<string, boolean>) => {
    const newData = data.filter(single => {
      return imageFormats[single.type];
    });
  
    return newData;
  };
  

  const enhanceSortTypes = {
    [SORT_BY_SIZE]: (v: any) => parseFloat(v.size.inBytes),
    [SORT_BY_NAME]: (v: any) => v.name.toLowerCase(),
    [SORT_BY_DATE]: (v: any) => new Date(v.created)
  };
  
  export const getFilteredDataBySortBy = (data: any[], type: SORT_BY_TYPES) => {
    const newData = _.orderBy(data, e => enhanceSortTypes[type](e));
  
    return newData;
  };