import React, {ReactNode} from 'react';
import {createUseStyles} from 'react-jss';
import {images as imageTypes} from '../components/imges';

const useStyles = createUseStyles({
  container: {
    width: '10rem',
    height: '10rem',
    backgroundColor: '#FAFAFC',
    borderRadius: '0.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    margin: '10px',
    verticalAlign:'middle',
    '&:hover': {
      backgroundColor: '#E6E6EA'
    }
  },

  titleName: {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    color:'#6D7091'
  },
  titleType:{
    position: 'absolute',
    top: '5%',
    left: '5%',
    color:'#6D7091',
    opacity:'.6'
  }
});

export const ImageContainer: React.FC<{
  image: {
    type: 'png' | 'svg';
    buffer: string;
  };
}> = ({image}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {imageTypes?.[image.type]?.({buffer: image.buffer})}
      <span className={classes.titleName}>Home</span>
      <span className={classes.titleType}>{image.type}</span>
    </div>
  );
};
