import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
interface Props {
  buffer: string;
  className?: string;
}

const useStyles = createUseStyles({
  container: {
    width: '60%',
    height: '60%'
  }
});

export const Svg: React.FC<Props> = ({buffer, className}) => {
  const classes = useStyles();
  return (
    <img
      className={clsx(classes.container, className)}
      src={`data:image/svg+xml;base64,${encodeURIComponent(buffer)}`}
    />
  );
};

export const Png: React.FC<Props> = ({buffer, className}) => {
  const classes = useStyles();
  return (
    <img
         className={clsx(classes.container, className)}
      src={`data:image/png;base64,${buffer}`}
    />
  );
};

export const Jpg: React.FC<Props> = ({buffer, className}) => {
  const classes = useStyles();
  return (
    <img
         className={clsx(classes.container, className)}
      src={`data:image/jpg;base64,${buffer}`}
    />
  );
};

export const Ico: React.FC<Props> = ({buffer, className}) => {
  const classes = useStyles();
  return (
    <img
         className={clsx(classes.container, className)}
      src={`data:image/x-icon;base64,${buffer}`}
    />
  );
};

export const Gif: React.FC<Props> = ({buffer, className}) => {
    const classes = useStyles();
    return (
      <img
           className={clsx(classes.container, className)}
        src={`data:image/gif;base64,${buffer}`}
      />
    );
  };

export const images = {
  svg: (props: Props) => <Svg {...props} />,
  png: (props: Props) => <Png {...props} />,
  ico: (props: Props) => <Ico {...props} />,
  gif: (props: Props) => <Gif {...props} />,
  jpg: (props: Props) => <Jpg {...props} />,
  jpeg:(props: Props) => <Jpg {...props} />,
};
