import views from '../../scss/variables/responsives.module.scss';
import { Carousel } from 'antd';

type Props = {
  children: JSX.Element | JSX.Element[];
  isInfinite?: boolean;
  isArrow?: boolean;
};

const ApartmentList = ({ children, isInfinite = false, isArrow = false }: Props) => {
  return (
    <Carousel
      dots={false}
      draggable
      slidesToShow={3}
      arrows={false}
      responsive={[
        {
          breakpoint: Number(views.mobile),
          settings: {
            slidesToScroll: 1,
            slidesToShow: 2,
            centerMode: false,
            arrows: false
          },
        },
      ]}
      infinite={isInfinite}
      slidesToScroll={1}
      centerMode
      initialSlide={1}
    >
      {children}
    </Carousel>
  );
};

export default ApartmentList;
