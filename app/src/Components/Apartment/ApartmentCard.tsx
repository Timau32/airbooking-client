import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { message, Typography } from 'antd';
import { MouseEvent } from 'react';
import { IApartment } from '../../interfaces';
import classes from './Apartment.module.scss';
import { getCookie } from '../../helpers/getCookie';

type Props = {
  apartment: IApartment;
};

const ApartmentCard = ({ apartment }: Props) => {
  const onHeartClick = (event: MouseEvent) => {
    event.stopPropagation();
    const token = getCookie('auth-token');
    if (!token) message.warning('Ввойдите в аккаунт чтобы добавить в избранное');
  };

  return (
    <div className={classes.latest_item}>
      <div className={classes.latest_body}>
        <HeartOutlined onClick={onHeartClick} className={classes.latest_like} />
        <img src={apartment.img} alt={apartment.title} />
        <Typography.Paragraph className={classes.latest_title}>{apartment.title}</Typography.Paragraph>
      </div>
    </div>
  );
};

export default ApartmentCard;
