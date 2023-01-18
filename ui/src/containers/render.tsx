import React from 'react';
import { createUseStyles } from 'react-jss';
import { ImageContainer } from '../components/box';
import { Filter } from '../components/Filter';

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

export const Render: React.FC<Props> = ({images, isGrouped}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <Filter />
      </div>
      {isGrouped ? (
        <div className={classes.viewContainer}>
          <h1>Grouped</h1>
          {images.map((image, i) => (
            <ImageContainer key={`${image.pathname}_${i}`} image={image} />
          ))}
        </div>
      ) : (
        <div className={classes.viewContainer}>
          {images.map((image, i) => (
            <ImageContainer key={`${image.pathname}_${i}`} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};
