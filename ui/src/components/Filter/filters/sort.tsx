import { createUseStyles } from 'react-jss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDidMountEffect } from '../../../hooks/useDidMountEffect';
import { setSortSortByFilter } from '../../../store/filters';
import { setFilterData } from '../../../store/state';
import * as helpers from '../../../utils/helpers';
import { Radio } from '../../radio';
import { sortingOptions, SORT_BY_TYPES } from '../types';

const useStyles = createUseStyles({});

export const FilterTwo: React.FC<{
}> = () => {
  const dispatch = useAppDispatch()
  const {sortBy} = useAppSelector((state) => state.filters)
  useDidMountEffect(() => {
    applySortByFilter();
  }, [sortBy]);

  const applySortByFilter = ()=>{
    const prevData = helpers.getFormattedData();
    const newData = helpers.getFilteredDataBySortBy(prevData, sortBy);
    dispatch(setFilterData({data: newData}));
  }

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
