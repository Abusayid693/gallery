import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import collapseIcon from '../assets/collapse.svg';
import { useToggle } from '../hooks/useToggle';

const useStyles = createUseStyles({
  container: {
    borderBottom: '1px solid #EDEEF7',
    borderTop: '1px solid #EDEEF7',
    padding: '1rem 0 1rem 0',
    cursor: 'pointer'
  },
  sliderHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '.7rem',

    '& img': {
      width: '1.2rem',
      height: '1.2rem',
      opacity: 0.3
    },
    '& span': {
      fontSize: '16px',
      fontWeight: '500'
    }
  },
  sliderBody: {
    // maxHeight: '200px',
    transition: 'max-height 0.3s ease-in-out',
    overflow: 'hidden'
  },
  sliderBodyActive: {
    // maxHeight: 0,
    transition: 'max-height 0.3s ease-in-out'
  }
});

interface Props {
  title: string;
  children: ReactNode;
  totalElements?: number
}

export const Slider: React.FC<Props> = ({title, children, totalElements=2}) => {
  const classes = useStyles();
  const [isOpen, toggle] = useToggle();

  return (
    <div className={clsx(classes.container, 'noselect')}>
      <div onClick={toggle} className={classes.sliderHeader}>
        <span>{title}</span>
        <img src={collapseIcon} />
      </div>
      <div
      style={{
        maxHeight : !isOpen ? 0 : totalElements * 51
      }}
        className={clsx(
          classes.sliderBody,
          !isOpen && classes.sliderBodyActive
        )}
      >
        {children}
      </div>
    </div>
  );
};
