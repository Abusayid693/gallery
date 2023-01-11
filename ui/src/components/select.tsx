import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import tickIcon from '../assets/tick.svg';

const useStyles = createUseStyles({
  container: {
    padding: '1rem 0 1rem 0.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    transition: '.2s',
    color: 'black',
    '&:hover': {
      opacity: '.9'
    }
  },
  circle: {
    width: '17px',
    height: '17px',
    backgroundColor: '#B3B6CE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px'
  },

  circleActive: {
    backgroundColor: '#fff'
  },

  containerActive: {
    backgroundColor: '#008DEB',
    color: '#fff'
  },

  selectTitle: {
    fontWeight: 500
  },
  selectIcon: {
    width: '18px',
    height: '18px'
  }
});

export const Select: React.FC<{
  isActive?: boolean;
  label?: string;
  onClick?: VoidFunction;
}> = ({isActive, label, ...any}) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.container, isActive && classes.containerActive)}
      {...any}
    >
      <div className={clsx(classes.circle, isActive && classes.circleActive)}>
        {isActive && <img className={classes.selectIcon} src={tickIcon} />}
      </div>
      <span className={classes.selectTitle}>{label}</span>
    </div>
  );
};
