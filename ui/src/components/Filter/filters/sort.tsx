import { createUseStyles } from 'react-jss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDidMountEffect } from '../../../hooks/useDidMountEffect';
import { setFilterData, setSortSortByFilter } from '../../../store/state';
import * as helpers from '../../../utils/helpers';
import { Radio } from '../../radio';
import { SORT_BY_TYPES, sortingOptions } from '../types';

const useStyles = createUseStyles({});

export const FilterTwo: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const {sortBy, groupBy} = useAppSelector(state => state.sate.filters);
  useDidMountEffect(() => {
    applySortByFilter();
  }, [sortBy]);

  const applySortByFilter = () => {
    const prevData = helpers.getFormattedData();
    const filteredData = helpers.getFilteredDataBySortBy(prevData, sortBy);

    if (!groupBy) {
      dispatch(setFilterData({data: filteredData}));
      return;
    }

    const groupedData = helpers.getFilteredDataByGroup(groupBy, filteredData);
    dispatch(setFilterData({data: groupedData, isGrouped: true}));
  };

  const handleFilterForSortBy = (key: SORT_BY_TYPES) => {
    if (sortBy === key) return;
    dispatch(setSortSortByFilter(key));
  };

  return (
    <div>
      {sortingOptions.map(option => (
        <Radio
          key={option}
          onClick={() => handleFilterForSortBy(option as any)}
          label={option}
          isActive={sortBy === option}
        />
      ))}
    </div>
  );
};
