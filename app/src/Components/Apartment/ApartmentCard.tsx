import { HeartOutlined } from '@ant-design/icons';
import { Carousel, message, Tooltip, Typography } from 'antd';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../helpers/getCookie';
import { IApartment } from '../../interfaces';
import classes from './Apartment.module.scss';

type Props = {
  apartment: IApartment;
  onItemClick?: (slug: string) => void;
};

const ApartmentCard = ({ apartment, onItemClick }: Props) => {
  const navigate = useNavigate();
  const onHeartClick = (event: MouseEvent) => {
    event.stopPropagation();
    const token = getCookie('auth-token');
    if (!token) message.warning('Ввойдите в аккаунт чтобы добавить в избранное');
  };

  const onClick = () => {
    onItemClick ? onItemClick(apartment.slug) : navigate(`/apartments/${apartment.slug}`);
  };

  return (
    <div className={classes.latest_item}>
      <div className={classes.latest_body}>
        <Tooltip title='Добавить в избранное'>
          <HeartOutlined onClick={onHeartClick} className={classes.latest_like} />
        </Tooltip>
        <Carousel className={classes.img} slidesToScroll={1} slidesToShow={1} dots arrows>
          {apartment.images.map((img) => (
            <img
              onClick={onClick}
              src={
                img?.image ||
                'https://asiamountains.net/assets/cache_image/assets/lib/resized/431/1600x1200_0x0_d0b.jpg'
              }
              alt={apartment.title}
            />
          ))}
        </Carousel>
        <Typography.Paragraph onClick={onClick} className={classes.latest_title}>
          {apartment.title}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default ApartmentCard;
