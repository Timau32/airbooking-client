import { HeartOutlined } from '@ant-design/icons';
import { Carousel, message, Tooltip, Typography } from 'antd';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../helpers/getCookie';
import { IApartment } from '../../interfaces';
import classes from './Apartment.module.scss';
import { useAppDispatch } from '../../store/hook';
import { setSelectedApartment } from '../../store/reducers/apartmentSlices';
import api from '../../api';
import axios from 'axios';

type Props = {
  apartment: IApartment;
  onItemClick?: (slug: string) => void;
};

const ApartmentCard = ({ apartment, onItemClick }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHeartClick = async (event: MouseEvent) => {
   try{
    event.stopPropagation();
    const token = getCookie('auth-token');
    if (!token) message.warning('Ввойдите в аккаунт чтобы добавить в избранное');
    const response = await api.setFavorite(apartment.slug);
    message.success('Объект успешно добавлен в избранное');
   }catch(Err){
    const errResponse = Err as any;
    if(axios.isAxiosError(errResponse) && errResponse.response?.data?.message){
      message.error(errResponse.response.data.message);
    }
   }
  };

  const onClick = () => {
    if (onItemClick) {
      onItemClick(apartment.slug);
    } else {
      dispatch(setSelectedApartment(apartment));
      navigate(`/apartments/${apartment.slug}`);
    }
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
              key={img.id + img.image}
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
