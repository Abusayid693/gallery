import React from 'react';
import {createUseStyles} from 'react-jss';
import {ImageContainer} from '../components/box';
import {Filter} from '../components/Filter';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '5rem',
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
    name: string
  }[];
}

export const Render: React.FC<Props> = ({images}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <Filter />
      </div>
      <div className={classes.viewContainer}>
        {images.map(image => (
          <ImageContainer image={image} />
        ))}
      </div>
    </div>
  );
};
