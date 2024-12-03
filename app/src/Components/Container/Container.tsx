import { ReactNode } from 'react';
import classes from './Container.module.scss';

type Props = {
  children: ReactNode | ReactNode[];
};

const Container = ({ children }: Props) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
