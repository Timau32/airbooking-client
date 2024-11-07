import classes from './Container.module.scss';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Container = ({ children }: Props) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
