import _ from 'lodash';
import { GROUP_BY_TYPES } from '../components/Filter/types';
import { setFilterData } from '../store/state';
import * as helpers from '../utils/helpers';
import { useAppDispatch, useAppSelector } from './redux';

export const useFilterGroupby = (): [
  (type: GROUP_BY_TYPES) => void,
  VoidFunction,
  (type: GROUP_BY_TYPES, data: any[]) => _.Dictionary<any[]>
] => {
  const sate = useAppSelector((state) => state.sate);
  const dispath = useAppDispatch();

  const apply = (type: GROUP_BY_TYPES) => {
    const result = _.mapValues(_.groupBy(helpers.getFormattedData(), type));
    dispath(setFilterData({data: result, isGrouped: true}));
  };

  const remove = () => {
    const result = helpers.getFormattedData(sate);
    dispath(setFilterData({data: result, isGrouped: false}));
  };

  const applyLazy = (type: GROUP_BY_TYPES, data: any[]) => {
    const result = _.mapValues(_.groupBy(data, type));
    return result;
  };

  return [apply, remove, applyLazy];
};
