import { Carousel } from 'antd';

type Props = {
  children: JSX.Element | JSX.Element[];
  isInfinite?: boolean;
};

const ApartmentList = ({ children, isInfinite = false }: Props) => {
  return (
    <Carousel dots={false} draggable slidesToShow={3} infinite={isInfinite} slidesToScroll={2}>
      {children}
    </Carousel>
  );
};

export default ApartmentList;
