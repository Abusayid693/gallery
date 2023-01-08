import React, {ReactNode} from 'react';
import {createUseStyles} from 'react-jss';
import collapseIcon from '../assets/collapse.svg';
import {useToggle} from '../hooks/useToggle';
import clsx from 'clsx';

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
      fontWeight:'500'
    }
  },
  sliderBody: {}
});

interface Props {
  title: string;
  children: ReactNode;
}

export const Slider: React.FC<Props> = ({title, children}) => {
  const classes = useStyles();
  const [isOpen, toggle] = useToggle();
  return (
    <div className={clsx(classes.container, 'noselect')}>
      <div onClick={toggle} className={classes.sliderHeader}>
        <span>{title}</span>
        <img src={collapseIcon} />
      </div>
      {isOpen && <div className={classes.sliderBody}>{children}</div>}
    </div>
  );
};
