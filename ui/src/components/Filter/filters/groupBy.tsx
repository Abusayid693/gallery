import { createUseStyles } from 'react-jss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDidMountEffect } from '../../../hooks/useDidMountEffect';
import { setSortGroupByFilter } from '../../../store/filters';
import { setFilterData } from '../../../store/state';
import * as helpers from '../../../utils/helpers';
import { Radio } from '../../radio';
import { groupingOptions, GROUP_BY_TYPES } from '../types';

const useStyles = createUseStyles({});

export const FilterThree: React.FC<{}> = () => {
  const {groupBy} = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();

  useDidMountEffect(() => {
    if (!groupBy) {
      removeGroupByFilter();
      return;
    }
    applyGroupByFilter();
  }, [groupBy]);

  const applyGroupByFilter = () => {
    const prevData = helpers.getFormattedData();
    const newData = helpers.getFilteredDataByGroup(groupBy, prevData);
    dispatch(setFilterData({data: newData, isGrouped: true}));
  };

  const removeGroupByFilter = () => {
    const result = helpers.getFormattedData();
    dispatch(setFilterData({data: result, isGrouped: false}));
  };

  const handleFilterForGroupBy = (key: GROUP_BY_TYPES) => {
    if (groupBy === key) {
      dispatch(setSortGroupByFilter(null));
      return;
    }
    dispatch(setSortGroupByFilter(key));
  };

  return (
    <div>
      {groupingOptions.map(option => (
        <Radio
          key={option}
          onClick={() => handleFilterForGroupBy(option as any)}
          label={option}
          isActive={groupBy === option}
        />
      ))}
    </div>
  );
};
