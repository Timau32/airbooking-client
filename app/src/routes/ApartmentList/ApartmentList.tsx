import { Carousel, Divider, List, message, Typography } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api';
import { pushUps } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setSearchedApartments } from '../../store/reducers/apartmentSlices';
import classes from './ApartmentList.module.scss';
import LoadingComponents from '../../Components/Spinner/LoadingComponents';
import { Container } from '../../Components';
import Leaflet from 'leaflet';
import retinaMarker from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadowMarker from 'leaflet/dist/images/marker-shadow.png';

const ApartmentList = () => {
  const [isLaodingSearch, setIsLoadingSearch] = useState(false);
  const { searchedApartments } = useAppSelector((state) => state.apartment);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const navigate = useNavigate();

  useEffect(() => {
        // @ts-ignore
        delete Leaflet.Icon.Default.prototype._getIconUrl;
        Leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: retinaMarker,
          iconUrl: icon,
          shadowUrl: shadowMarker,
        });
  }, [])

  useEffect(() => {
    const fetchData = (term: string[]) => {
      setIsLoadingSearch(true);

      api
        .flexSearch(term)
        .then((response) => dispatch(setSearchedApartments(response.data)))
        .catch((err) => message.error(pushUps.DEFAULT_FETCH_ERROR))
        .finally(() => setIsLoadingSearch(false));
    };

    if (searchTerm === 'all') {
      fetchData(['']);
    } else if (!searchedApartments.length) {
      fetchData(searchTerm?.split(' ')!);
    }
  }, []);

  const onNavigateToItem = (slug: string) => {
    navigate(`/apartments/${slug}`);
  };

  return (
    <>
      <section className={classes.cart}>
        <Container>
          <Typography.Title level={4} className={classes.title}>
            Результаты поиска по запросу {searchTerm}
          </Typography.Title>
          <List
            itemLayout='vertical'
            size='large'
            loading={isLaodingSearch}
            header={
              <div style={{ textAlign: 'right' }}>
                <b>Общее количество избранных:</b> {searchedApartments.length}
              </div>
            }
            pagination={{
              pageSize: 10,
            }}
            dataSource={searchedApartments}
            // footer={

            // }
            renderItem={(item, index) => (
              <List.Item
                key={item.slug}
                extra={
                  <Carousel draggable className={classes.img} slidesToShow={1} dots arrows={false}>
                    {item.images.length ? (
                      item.images.map((image) => (
                        <img key={image.id} className={classes.img_item} alt='logo' src={image?.image} />
                      ))
                    ) : (
                      <img
                        alt='logo'
                        className={classes.img_item}
                        src={'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                      />
                    )}
                  </Carousel>
                }
              >
                <Typography.Title level={4} className={classes.link} onClick={() => onNavigateToItem(item.slug)}>
                  {item.title}
                </Typography.Title>
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                {item.amenities.length ? (
                  <>
                    <Typography.Title level={5}>Основные удобства</Typography.Title>
                    <Typography.Paragraph>
                      {item.amenities.map((element, idx) => (
                        <Fragment key={element.slug}>
                          {element.name} {item.amenities.length - 1 !== idx && <Divider type='vertical' />}
                        </Fragment>
                      ))}
                    </Typography.Paragraph>
                  </>
                ) : null}
              </List.Item>
            )}
          />
        </Container>
      </section>
      {isLaodingSearch && <LoadingComponents />}
    </>
  );
};

export default ApartmentList;
