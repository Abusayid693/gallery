import { createUseStyles } from 'react-jss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDidMountEffect } from '../../../hooks/useDidMountEffect';
import { useFilterSortBy } from "../../../hooks/useFilterSortBy";
import { setSortSortByFilter } from '../../../store/filters';
import { Radio } from '../../radio';
import { sortingOptions, SORT_BY_TYPES } from '../types';

const useStyles = createUseStyles({});

export const FilterTwo: React.FC<{
}> = () => {
  const dispatch = useAppDispatch()
  const {sortBy} = useAppSelector((state) => state.filters)
  const [applySortByFilter] = useFilterSortBy();

  useDidMountEffect(() => {
    applySortByFilter(sortBy);
  }, [sortBy]);

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
