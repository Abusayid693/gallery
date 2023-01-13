import { store } from '../store/index';
import { setFilterData } from '../store/state';

export const useFilterImageType = () => {
  const {sate} = store.getState();
  const dispath = store.dispatch;
  /**
   * Apply filter on top already filtered data
   */
  let prev = sate.filteredImages.isFiltered ? sate.filteredImages.data : sate.images;

  const apply = (imageFormats: Record<string, boolean>) => {
    /**
     * if willFilterPerformAddition then apply filter on old data by removing current filter
     * or else apply new filter on already filtered data
     */

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

  return {apply, applyLazy};
};
