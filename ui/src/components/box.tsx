import React, {ReactNode} from 'react';
import {createUseStyles} from 'react-jss';
import {images as imageTypes} from '../components/imges';
import * as helpers from '../utils/helpers';
import {useToggle} from '../hooks/useToggle';
import clsx from 'clsx';

const useStyles = createUseStyles({
  container: {
    width: '11rem',
    height: '11rem',
    backgroundColor: '#FAFAFC',
    borderRadius: '0.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    margin: '5px',
    verticalAlign: 'middle',
    '&:hover': {
      backgroundColor: '#E6E6EA'
    }
  },

  titleName: {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    color: '#6D7091',
    opacity: '.3'
  },
  titleType: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    color: '#6D7091',
    opacity: '.3'
  },
  active: {
    opacity: '.7'
  }
});

export const ImageContainer: React.FC<{
  image: {
    type: 'png' | 'svg';
    buffer: string;
    name: string;
  };
}> = ({image}) => {
  const classes = useStyles();
  const [isHovered, _, setHover, unsetHover] = useToggle();

  return (
    <div
      onMouseEnter={setHover}
      onMouseLeave={unsetHover}
      className={classes.container}
    >
      {imageTypes?.[image.type]?.({buffer: image.buffer})}
      <span className={clsx(classes.titleType, isHovered && classes.active)}>
        {image.type}
      </span>
      <span className={clsx(classes.titleName, isHovered && classes.active)}>
        {helpers.getSlicedString(image.name)}
      </span>
    </div>
  );
};
