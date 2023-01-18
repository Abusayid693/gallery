import { setFilterData } from '../store/state';
import * as helpers from "../utils/helpers";
import { useAppDispatch, useAppSelector } from './redux';

export const useFilterImageType = (): [
  (imageFormats: Record<string, boolean>) => void,
  (data: any[], imageFormats: Record<string, boolean>) => any[]
] => {
  const sate = useAppSelector((state) => state.sate)
  const dispath = useAppDispatch();

  const apply = (imageFormats: Record<string, boolean>) => {
    /**
     * if willFilterPerformAddition then apply filter on old data by removing current filter
     * or else apply new filter on already filtered data
     */

    const prev = helpers.getFormattedData(sate) 
    const newData = prev.filter(single => {
      return imageFormats[single.type];
    });

    dispath(setFilterData({data: newData}));
  };

  const applyLazy = (data: any[], imageFormats: Record<string, boolean>) => {
    const newData = data.filter(single => {
      return imageFormats[single.type];
    });

    return newData;
  };

  return [apply, applyLazy];
};
