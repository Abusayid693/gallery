import _ from 'lodash';
import { SORT_BY_DATE, SORT_BY_NAME, SORT_BY_SIZE, SORT_BY_TYPES } from '../components/Filter/types';
import { setFilterData } from '../store/state';
import * as helpers from '../utils/helpers';
import { useAppDispatch, useAppSelector } from './redux';

const enhanceSortTypes = {
  [SORT_BY_SIZE]: (v: any) => parseFloat(v.size.inBytes),
  [SORT_BY_NAME]: (v: any) => v.name.toLowerCase(),
  [SORT_BY_DATE]: (v: any) => new Date(v.created)
};

export const useFilterSortBy = (): [
  (type: SORT_BY_TYPES) => void,
  (data: any[], type: SORT_BY_TYPES) => any[]
] => {
  const sate = useAppSelector((state) => state.sate);
  const dispath = useAppDispatch();

  const apply = (type: SORT_BY_TYPES) => {
    const newData = _.orderBy(helpers.getFormattedData(sate), e => enhanceSortTypes[type](e));

    dispath(setFilterData({data: newData}));
  };

  const applyLazy = (data: any[], type: SORT_BY_TYPES) => {
    const newData = _.orderBy(data, e => enhanceSortTypes[type](e));

    return newData;
  };

  return [apply, applyLazy];
};
