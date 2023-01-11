import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import filterIcon from '../../assets/filter.svg';
import { useAppSelector } from '../../hooks/redux';
import { Slider } from '../slider';
import { FilterThree } from './filters/groupBy';
import { FilterOne } from './filters/imageType';
import { FilterTwo } from './filters/sort';
import {
  groupingOptions,
  GROUP_BY_TYPES,
  sortingOptions,
  SORT_BY_NAME,
  SORT_BY_TYPES
} from './types';

const useStyles = createUseStyles({
  constainer: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    left: 0,
    borderRight: '1px solid #EDEEF7',
    borderTop: '1px solid #EDEEF7',
    borderBottom: '1px solid #EDEEF7'
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FAFAFC',
    padding: '1rem 0 1rem 0.5rem',
    gap: '7px',
    fontWeight: '500',

    '& img': {
      width: '1rem',
      height: '1.8rem'
    },
    '& span': {
      fontSize: '19px'
    }
  },
  filterBody: {}
});

export const Filter = () => {
  const classes = useStyles();
  const {imageFormats} = useAppSelector(state => state.sate);
  const [filter, setFilters] = useState<{
    imageFormats: Record<string, boolean>;
    sortBy: SORT_BY_TYPES;
    groupBy: GROUP_BY_TYPES;
  }>({
    imageFormats: {},
    sortBy: SORT_BY_NAME,
    groupBy: null
  });

  const constructImageFormatsFilters = () => {
    const obj = {};
    imageFormats?.forEach(format => (obj[format] = true));

    return obj;
  };

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      imageFormats: constructImageFormatsFilters()
    }));
  }, [imageFormats]);

  const handleFilterForImageFormats = (key: string) => {
    setFilters(prev => ({
      ...prev,
      imageFormats: {...prev.imageFormats, [key]: !prev.imageFormats[key]}
    }));
  };

  const handleFilterForSortBy = (key: SORT_BY_TYPES) => {
    if (filter.sortBy === key) return;
    setFilters(prev => ({
      ...prev,
      sortBy: key
    }));
  };

  const handleFilterForGroupBy = (key: GROUP_BY_TYPES) => {
    if (filter.groupBy === key) {
      setFilters(prev => ({
        ...prev,
        groupBy: null
      }));
      return;
    }
    setFilters(prev => ({
      ...prev,
      groupBy: key
    }));
  };

  return (
    <div className={classes.constainer}>
      <div className={classes.filterHeader}>
        <img src={filterIcon} />
        <span>Filters</span>
      </div>
      <div className={classes.filterBody}>
        <Slider
          totalElements={Object.keys(filter.imageFormats).length}
          title="Types"
        >
          <FilterOne
            handleFilterChange={handleFilterForImageFormats}
            filters={filter.imageFormats}
          />
        </Slider>
        <Slider totalElements={sortingOptions.length} title="Sort">
          <FilterTwo
            handleFilterChange={handleFilterForSortBy}
            filter={filter.sortBy}
          />
        </Slider>
        <Slider totalElements={groupingOptions.length} title="Group by">
          <FilterThree
            handleFilterChange={handleFilterForGroupBy}
            filter={filter.groupBy}
          />
        </Slider>
      </div>
    </div>
  );
};
