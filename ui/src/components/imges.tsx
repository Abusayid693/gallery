import React from 'react';
import {createUseStyles} from 'react-jss';
interface Props {
  buffer: string;
}

const useStyles = createUseStyles({
  container: {
    width: '70%',
    height: '70%'
  }
});

export const Svg: React.FC<Props> = ({buffer}) => {
  const classes = useStyles();
  return (
    <img
      className={classes.container}
      src={`data:image/svg+xml;base64,${encodeURIComponent(buffer)}`}
    />
  );
};

export const Png: React.FC<Props> = ({buffer}) => {
  const classes = useStyles();
  return (
    <img
      className={classes.container}
      src={`data:image/png;base64,${buffer}`}
    />
  );
};

export const images = {
  svg: (props: Props) => <Svg {...props} />,
  png: (props: Props) => <Png {...props} />
};