import _ from 'lodash';
import { SORT_BY_DATE, SORT_BY_NAME, SORT_BY_SIZE, SORT_BY_TYPES } from '../components/Filter/types';
import { store } from '../store/index';
import { setFilterData } from '../store/state';

const enhanceSortTypes = {
  [SORT_BY_SIZE]: (v: any) => parseFloat(v.size.inBytes),
  [SORT_BY_NAME]: (v:any) => v.name.toLowerCase(),
  [SORT_BY_DATE]: (v:any) => new Date(v.created)
};

export const useFilterSortBy = () => {
  const {sate} = store.getState();
  const dispath = store.dispatch;
  /**
   * Apply filter on top already filtered data
   */
  let prev = sate.filteredImages.isFiltered ? sate.filteredImages.data : sate.images;

  const apply = (type: SORT_BY_TYPES) => {
    const newData = _.orderBy(prev, e => enhanceSortTypes[type](e));

    dispath(setFilterData({data: newData}));
  };

  const applyLazy = (data:any[], type: SORT_BY_TYPES) => {
    const newData = _.orderBy(data, e => enhanceSortTypes[type](e));

    return newData;
  };

  return {apply, applyLazy};
};
