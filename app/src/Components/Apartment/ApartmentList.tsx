import views from '../../scss/variables/responsives.module.scss';
import { Carousel } from 'antd';

type Props = {
  children: JSX.Element | JSX.Element[];
  isInfinite?: boolean;
};

const ApartmentList = ({ children, isInfinite = false }: Props) => {
  const { width } = document.documentElement.getBoundingClientRect();

  return (
    <Carousel
      dots={false}
      draggable
      slidesToShow={width > Number(views.mobile) ? 3 : 2}
      infinite={isInfinite}
      slidesToScroll={2}
      centerMode
      initialSlide={2}
    >
      {children}
    </Carousel>
  );
};

export default ApartmentList;
