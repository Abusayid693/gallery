import { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import filterIcon from '../../assets/filter.svg';
import { useAppSelector } from '../../hooks/redux';
import { Slider } from '../slider';
import { FilterThree } from './filters/groupBy';
import { FilterOne } from './filters/imageType';
import { FilterTwo } from './filters/sort';
import { groupingOptions, sortingOptions } from './types';

import { useAppDispatch } from '../../hooks/redux';
import { useDidMountEffect } from '../../hooks/useDidMountEffect';
import { useMountSkip } from '../../hooks/useMountSkip';
import { setFilterData, setImageFormatFilter, setInitialImageFormats } from '../../store/state';
import * as helpers from '../../utils/helpers';
//-

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
  const sate = useAppSelector(state => state.sate);
  const filter = sate.filters;
  const freeze = useRef(true);

  const shouldApplyAllFilter = useRef(false);

  const constructImageFormatsFilters = () => {
    const obj = {};
    sate.imageFormats?.forEach(format => (obj[format] = true));

    return obj;
  };

  useEffect(() => {
    dispatch(setInitialImageFormats({imageFormats: constructImageFormatsFilters()}));
  }, [sate.imageFormats]);

  useDidMountEffect(() => {
    if (freeze.current) return;
    /**
     * Apply all filter on original unfiltered data in a chain
     */
    if (shouldApplyAllFilter.current) {
      let filteredData = helpers.getFilteredDataByImageType(sate.images, filter.imageFormats);
      filteredData = helpers.getFilteredDataBySortBy(filteredData, filter.sortBy);
      if (filter.groupBy) {
        const filteredDataGrouped = helpers.getFilteredDataByGroup(filter.groupBy, filteredData);
        dispatch(setFilterData({data: filteredDataGrouped, isGrouped: true}));
        return;
      }
      dispatch(setFilterData({data: filteredData}));
      shouldApplyAllFilter.current = false;
      return;
    }
    /**
     * Apply imageFormats filter
     */
    applyImageTypeFilter();
  }, [filter.imageFormats]);

  /**
   * Apply all filter on original unfiltered data in a chain on new image addition or deletion
   */
  useMountSkip(() => {
    if (!sate.isFetched) return;
    let filteredData = helpers.getFilteredDataByImageType(sate.images, filter.imageFormats);
    filteredData = helpers.getFilteredDataBySortBy(filteredData, filter.sortBy);
    if (filter.groupBy) {
      const filteredDataGrouped = helpers.getFilteredDataByGroup(filter.groupBy, filteredData);
      dispatch(setFilterData({data: filteredDataGrouped, isGrouped: true}));
      return;
    }
    dispatch(setFilterData({data: filteredData}));
    return;
  }, [sate.images]);

  const applyImageTypeFilter = () => {
    const prevData = helpers.getFormattedData(sate);
    const newData = helpers.getFilteredDataByImageType(prevData, filter.imageFormats);

    if (!filter.groupBy) {
      dispatch(setFilterData({data: newData}));
      return;
    }
    const groupedData = helpers.getFilteredDataByGroup(filter.groupBy, newData);
    dispatch(setFilterData({data: groupedData, isGrouped: true}));
  };

  /**
   * This operation will add or remove data
   * @param key assets format to filter with
   */
  const handleFilterForImageFormats = (key: string) => {
    /**
     * if filter key is not present in the filters it means a
     * new filter key will be added which will perform addition
     */
    const willFilterPerformAddition = !filter.imageFormats[key];
    dispatch(setImageFormatFilter(key));
    // [TODO]: review this if better approach possible
    if (willFilterPerformAddition) shouldApplyAllFilter.current = true;
    freeze.current = false;
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
          <FilterTwo />
        </Slider>
        <Slider totalElements={groupingOptions.length} title="Group by">
          <FilterThree />
        </Slider>
      </div>
    </div>
  );
};
