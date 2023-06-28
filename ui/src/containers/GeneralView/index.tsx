import React from 'react';
import { createUseStyles } from 'react-jss';
import { Filter } from '../../components/Filter';
import { ImageContainer } from '../../components/box';
import { FullView } from "../../components/fullView";
import { useAppSelector } from '../../hooks/redux';
import { GroupRender } from './groupRender';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '5rem'
  },

  filterContainer: {
    width: '400px'
  },

  viewContainer: {
    // display:"flex",
    // flexDirection:"row",
    gap: '0.7rem',
    width: '100%'
  }
});

interface Props {
  images: {
    type: 'png' | 'svg';
    buffer: string;
    name: string;
    pathname: string;
  }[];
  isGrouped: boolean;
}

export const Render: React.FC<Props> = ({}) => {
  const classes = useStyles();
  const {
    filteredImages: {isGrouped, data}
  } = useAppSelector(state => state.sate);

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <FullView/>
        <Filter />
      </div>
      {isGrouped ? (
        <div className={classes.viewContainer}>
          <GroupRender data={data as Record<string, any[]>} />
        </div>
      ) : (
        <div className={classes.viewContainer}>
          {/* @ts-ignore */}
          {data.map((image, i) => (
            <ImageContainer key={`${image.pathname}_${i}`} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};
