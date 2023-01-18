import { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import filterIcon from '../../assets/filter.svg';
import { useAppSelector } from '../../hooks/redux';
import { Slider } from '../slider';
import { FilterThree } from './filters/groupBy';
import { FilterOne } from './filters/imageType';
import { FilterTwo } from './filters/sort';
import { groupingOptions, GROUP_BY_TYPES, sortingOptions, SORT_BY_TYPES } from './types';

import { useAppDispatch } from '../../hooks/redux';
import { useDidMountEffect } from '../../hooks/useDidMountEffect';
import { useFilterGroupby } from '../../hooks/useFilterGroupby';
import { useFilterImageType } from '../../hooks/useFilterImageType';
import { useFilterSortBy } from '../../hooks/useFilterSortBy';
import { setFilterData } from '../../store/state';

//-
import {
  setImageFormatFilter,
  setInitialImageFormats,
  setSortGroupByFilter,
  setSortSortByFilter
} from '../../store/filters';

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
  const dispatch = useAppDispatch();
  const {imageFormats, images} = useAppSelector(state => state.sate);
  const filter = useAppSelector(state => state.filters);
  const freeze = useRef(true);

  const shouldApplyAllFilter = useRef(false);

  const [applyImageTypeFilter, applyImageTypeFilterLazy] = useFilterImageType();
  const [applySortByFilter, applySortByFilterLazy] = useFilterSortBy();
  const [applyGroupByFilter, removeGroupByFilter, applyGroupByFilterLazy] = useFilterGroupby();

  const constructImageFormatsFilters = () => {
    const obj = {};
    imageFormats?.forEach(format => (obj[format] = true));

    return obj;
  };

  useEffect(() => {
    dispatch(setInitialImageFormats({imageFormats: constructImageFormatsFilters()}));
  }, [imageFormats]);

  /**
   * Apply all filter on original unfiltered data in a chain
   */
  useDidMountEffect(() => {
    if (freeze.current) return;
    if (shouldApplyAllFilter.current) {
      let filteredData = applyImageTypeFilterLazy(images, filter.imageFormats);
      filteredData = applySortByFilterLazy(filteredData, filter.sortBy);
      if (filter.groupBy) {
        const filteredDataGrouped = applyGroupByFilterLazy(filter.groupBy, filteredData);
        dispatch(setFilterData({data: filteredDataGrouped, isGrouped: true}));
        return;
      }
      dispatch(setFilterData({data: filteredData}));
      shouldApplyAllFilter.current = false;
      return;
    }
    applyImageTypeFilter(filter.imageFormats);
  }, [filter.imageFormats]);

  /**
   * This operation will add or remove data
   * @param key assets format to filter with
   */
  const handleFilterForImageFormats = (key: string) => {
    const willFilterPerformAddition = !filter.imageFormats[key];
    dispatch(setImageFormatFilter(key));
    // [TODO]: review this if better approach possible
    if (willFilterPerformAddition) shouldApplyAllFilter.current = true;
    freeze.current = false;
  };

  useDidMountEffect(() => {
    applySortByFilter(filter.sortBy);
  }, [filter.sortBy]);

  const handleFilterForSortBy = (key: SORT_BY_TYPES) => {
    if (filter.sortBy === key) return;
    dispatch(setSortSortByFilter(key));
  };

  useDidMountEffect(() => {
    if (!filter.groupBy) {
      removeGroupByFilter();
      return;
    }
    applyGroupByFilter(filter.groupBy);
  }, [filter.groupBy]);

  const handleFilterForGroupBy = (key: GROUP_BY_TYPES) => {
    if (filter.groupBy === key) {
      dispatch(setSortGroupByFilter(null));
      return;
    }
    dispatch(setSortGroupByFilter(key));
  };

  return (
    <div className={classes.constainer}>
      <div className={classes.filterHeader}>
        <img src={filterIcon} />
        <span>Filters</span>
      </div>
      <div className={classes.filterBody}>
        <Slider totalElements={Object.keys(filter.imageFormats).length} title="Types">
          <FilterOne
            handleFilterChange={handleFilterForImageFormats}
            filters={filter.imageFormats}
          />
        </Slider>
        <Slider totalElements={sortingOptions.length} title="Sort">
          <FilterTwo handleFilterChange={handleFilterForSortBy} filter={filter.sortBy} />
        </Slider>
        <Slider totalElements={groupingOptions.length} title="Group by">
          <FilterThree handleFilterChange={handleFilterForGroupBy} filter={filter.groupBy} />
        </Slider>
      </div>
    </div>
  );
};
