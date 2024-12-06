import Spinner from './Spinner';
import classes from './Spinner.module.scss';

function LoadingComponents() {
  return (
    <div className={classes.loading}>
      <Spinner size={60} />
    </div>
  );
}

export default LoadingComponents;
