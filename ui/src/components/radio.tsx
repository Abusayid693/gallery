import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

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
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  circleActive: {
    backgroundColor: '#fff'
  },

  containerActive: {
    backgroundColor: '#008DEB',
    color: '#fff'
  },

  radioTitle: {
    fontWeight: 500
  }
});

export const Radio: React.FC<{
  isActive?: boolean;
  label?: string;
  onClick?: VoidFunction
}> = ({isActive = true, label, ...any}) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.container, isActive && classes.containerActive)}
      {...any}
    >
      <div
        className={clsx(classes.circle, isActive && classes.circleActive)}
      ></div>
      <span className={classes.radioTitle}>{label}</span>
    </div>
  );
};
