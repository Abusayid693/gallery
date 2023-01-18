import { createUseStyles } from 'react-jss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDidMountEffect } from '../../../hooks/useDidMountEffect';
import { useFilterGroupby } from '../../../hooks/useFilterGroupby';
import { setSortGroupByFilter } from '../../../store/filters';
import { Radio } from '../../radio';
import { groupingOptions, GROUP_BY_TYPES } from '../types';

const useStyles = createUseStyles({});

export const FilterThree: React.FC<{
}> = () => {
  const {groupBy} = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();
  const [applyGroupByFilter, removeGroupByFilter] = useFilterGroupby();

  useDidMountEffect(() => {
    if (!groupBy) {
      removeGroupByFilter();
      return;
    }
    applyGroupByFilter(groupBy);
  }, [groupBy]);

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
