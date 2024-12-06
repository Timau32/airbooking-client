import { LoadingOutlined } from '@ant-design/icons';
import classes from './Spinner.module.scss';

type Props = {
  size?: number | string;
};

function Spinner({ size }: Props) {
  return (
    <div className={classes.spinner}>
      <LoadingOutlined style={{ fontSize: size || '1em' }} />
    </div>
  );
}

export default Spinner;
