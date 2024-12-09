import { ApartmentCard, ApartmentList, Container, Search } from '../../Components';
import { Carousel, Divider, Flex, message, Typography } from 'antd';
import classes from './Home.module.scss';
import { useEffect, useState } from 'react';
import api from '../../api';
import views from '../../scss/variables/responsives.module.scss';
import {
  CloudOutlined,
  CoffeeOutlined,
  DatabaseOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  HomeOutlined,
  HourglassOutlined,
  KeyOutlined,
  MergeOutlined,
  MoonOutlined,
  NodeIndexOutlined,
  ShopOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { ILocations } from '../../interfaces';
import LoadingComponents from '../../Components/Spinner/LoadingComponents';
import { pushUps } from '../../helpers/pushUps';
import imageHolder from "../../assets/img/image-holder-icon.png";


const categories = [
  { id: 1, label: 'Города мечты', icon: <HomeOutlined /> },
  { id: 2, label: 'Квартиры', icon: <KeyOutlined /> },
  { id: 3, label: 'Дома', icon: <HomeOutlined /> },
  { id: 4, label: 'Комнаты', icon: <DatabaseOutlined /> },
  { id: 5, label: 'Номера', icon: <WindowsOutlined /> },
  { id: 6, label: 'Особняки', icon: <CloudOutlined /> },
  { id: 7, label: 'Домики', icon: <MergeOutlined /> },
  { id: 8, label: 'Юрты', icon: <HeartOutlined /> },
  { id: 9, label: 'Дома отдыха', icon: <ShopOutlined /> },
  { id: 10, label: 'Рядом озеро', icon: <EnvironmentOutlined /> },
  { id: 11, label: 'Зоны отдыха', icon: <MoonOutlined /> },
  { id: 12, label: 'Исторические места', icon: <HourglassOutlined /> },
  { id: 13, label: 'Уникальные', icon: <NodeIndexOutlined /> },
  { id: 14, label: 'Апартаменты', icon: <CoffeeOutlined /> },
];

const Home = () => {
  const [homeData, setHomeData] = useState<{ popular: any[]; holidays: any[]; cities: ILocations.ICities[] }>({
    popular: [],
    holidays: [],
    cities: [],
  });
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setIsLoading(true);
      const holidays = (await api.getApartments()).data.results;
      const cities = (await api.getCities()).data.results;
      const popular = (await api.getPopular()).data.results;
      // const categories = await

      console.log({ holidays, cities, popular });
      setHomeData({ popular, holidays, cities });
    } catch (err) {
      console.log(err);
      message.error(pushUps.DEFAULT_FETCH_ERROR, 6);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className={classes.section}>
        <Container>
          <div className={classes.search_align}>
            <Typography.Title>Найдём, где остановиться!</Typography.Title>
            <Search />
          </div>
          <Divider className={classes.search_divider} />

          <Carousel
            slidesToShow={7}
            slidesToScroll={4}
            slide='10'
            className={classes.search_category}
            responsive={[
              {
                breakpoint: Number(views.mobile),
                settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2,
                },
              },
            ]}
            dots={false}
            infinite={false}
            draggable
            arrows
            initialSlide={2}
          >
            {categories.map(({ id, label, icon }) => (
              <div key={`category-${id}`} className={classes.search_category_item}>
                <span className={classes.search_category_pointer}>
                  {icon} {label}
                </span>
              </div>
            ))}
          </Carousel>
        </Container>
      </section>

      <section>
        <Container>
          <Typography.Title className={classes.text_center} level={2}>
            Идеи для отпуска
          </Typography.Title>
          <div className={classes.latest_apartments}>
            <ApartmentList isInfinite>
              {homeData.holidays.map((apartment) => (
                <ApartmentCard key={`apartment-${apartment.id}`} apartment={{ ...apartment, description: '' }} />
              ))}
            </ApartmentList>
          </div>
        </Container>
      </section>

      <section className={classes.section}>
        <Container>
          <Typography.Title className={classes.text_center} level={2}>
            Популярные места
          </Typography.Title>
          <div className={classes.latest_apartments}>
            <ApartmentList>
              {homeData.popular.map((apartment) => (
                <ApartmentCard key={`apartment-${apartment.id}`} apartment={apartment} />
              ))}
            </ApartmentList>
          </div>
        </Container>
      </section>

      <section className={classes.section}>
        <Container>
          <Typography.Title className={classes.text_center} level={2}>
            Куда поехать
          </Typography.Title>
          <div className={classes.latest_apartments}>
            <Flex className={classes.cities}>
              {homeData.cities.map((cities, idx) => (
                <div className={classes.latest_item} key={`cities-${cities.id}`}>
                  <div className={classes.latest_body}>
                    <p className={classes.cities_results}>
                      {new Intl.NumberFormat('de-DE').format(Math.floor(Math.random() * 10000))} вариантов
                    </p>
                    <img src={cities.image || imageHolder} alt={cities.name} />
                    <Typography.Paragraph className={classes.latest_title}>{cities.name}</Typography.Paragraph>
                  </div>
                </div>
              ))}
            </Flex>
          </div>
        </Container>
      </section>

      {loading && <LoadingComponents />}
    </>
  );
};

export default Home;
