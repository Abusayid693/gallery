import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { images as imageTypes } from '../components/imges';
import { useToggle } from '../hooks/useToggle';
import * as helpers from '../utils/helpers';

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

  warningContainer: {
    backgroundColor: 'rgba(185, 28, 28, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(185, 28, 28, 0.2)'
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
    created: string;
    directory: string;
    path: string;
    size: {value: string; inBytes: number; type: string};
    thresholdSize: number;
  };
}> = ({image}) => {
  const classes = useStyles();
  const [isHovered, _, setHover, unsetHover] = useToggle();

  return (
    <div
      onMouseEnter={setHover}
      onMouseLeave={unsetHover}
      className={clsx(
        classes.container,
        Number(image.size.value) > image.thresholdSize && classes.warningContainer
      )}
    >
      {imageTypes?.[image.type]?.({buffer: image.buffer})}
      <span className={clsx(classes.titleType, isHovered && classes.active)}>{image.type}</span>
      <span className={clsx(classes.titleName, isHovered && classes.active)}>
        {helpers.getSlicedString(image.name)}
      </span>
    </div>
  );
};
