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

// const lattestMocks = [
//   {
//     id: '1',
//     title: '2x rooms around Sulaiman-too',
//     images: ['https://avatars.mds.yandex.net/get-vertis-journal/4469561/cover.jpg_1704460151500/orig'],
//   },
//   {
//     id: '2',
//     title: '2x rooms / шикарный вид на закат',
//     images: ['https://asiamountains.net/assets/cache_image/assets/lib/resized/857/1600x1207_0x0_d0b.jpg'],
//   },
//   {
//     id: '3',
//     title: 'Керме тоо',
//     images: [
//       'https://thumbs.dreamstime.com/b/%D0%B2%D0%B8%D0%B4-%D0%BD%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4-%D0%BE%D1%88-%D0%B2%D0%BE-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F-%D0%B7%D0%B0%D0%BA%D0%B0%D1%82%D0%B0-%D0%BA%D1%8B%D1%80%D0%B3%D1%8B%D0%B7%D1%81%D1%82%D0%B0%D0%BD%D0%B0-%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0-%D1%81-%D0%B3%D0%BE%D1%80%D1%8B-213463263.jpg',
//     ],
//   },
//   {
//     id: '4',
//     title: 'С солнечным виддом',
//     images: ['https://st-1.akipress.org/cdn-st-0/qX5/Q/820250.cb171f0603b20cf34e4930b1bfa4c6a9.jpg'],
//   },
//   {
//     id: '5',
//     title: '2x rooms Квартира',
//     images: [
//       'https://cf.bstatic.com/xdata/images/hotel/max1024x768/552590468.jpg?k=ba8b21bfde4a248b41e90242e79398ba6ac61f0a37886c99badf4a8ce1099f4b&o=&hp=1',
//     ],
//   },
//   {
//     id: '6',
//     title: '2x rooms Дом с видом на гору',
//     images: ['https://motohorek.life/wp-content/uploads/2021/09/E3EC2819-1DFF-41CC-9EF6-50E329023B2E-1024x683.jpeg'],
//   },
//   {
//     id: '7',
//     title: 'Люкс квартира',
//     images: ['https://asiamountains.net/assets/cache_image/assets/lib/resized/431/1600x1200_0x0_d0b.jpg'],
//   },
// ];

// const citiesMocks = [
//   {
//     id: 1,
//     title: 'Иссык-Куль',
//     images: 'https://avatars.mds.yandex.net/get-vertis-journal/4469561/cover.jpg_1704460151500/orig',
//   },
//   {
//     id: 2,
//     title: 'Далал-Абад',
//     images: 'https://asiamountains.net/assets/cache_image/assets/lib/resized/857/1600x1207_0x0_d0b.jpg',
//   },
//   {
//     id: 3,
//     title: 'Талас',
//     images:
//       'https://thumbs.dreamstime.com/b/%D0%B2%D0%B8%D0%B4-%D0%BD%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4-%D0%BE%D1%88-%D0%B2%D0%BE-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F-%D0%B7%D0%B0%D0%BA%D0%B0%D1%82%D0%B0-%D0%BA%D1%8B%D1%80%D0%B3%D1%8B%D0%B7%D1%81%D1%82%D0%B0%D0%BD%D0%B0-%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0-%D1%81-%D0%B3%D0%BE%D1%80%D1%8B-213463263.jpg',
//   },
//   {
//     id: 4,
//     title: 'Ош',
//     images: 'https://st-1.akipress.org/cdn-st-0/qX5/Q/820250.cb171f0603b20cf34e4930b1bfa4c6a9.jpg',
//   },
//   {
//     id: 5,
//     title: 'Бишкек',
//     images:
//       'https://cf.bstatic.com/xdata/images/hotel/max1024x768/552590468.jpg?k=ba8b21bfde4a248b41e90242e79398ba6ac61f0a37886c99badf4a8ce1099f4b&o=&hp=1',
//   },
//   {
//     id: 6,
//     title: 'Нарын',
//     images: 'https://motohorek.life/wp-content/uploads/2021/09/E3EC2819-1DFF-41CC-9EF6-50E329023B2E-1024x683.jpeg',
//   },
//   {
//     id: 7,
//     title: 'Баткен',
//     images: 'https://asiamountains.net/assets/cache_image/assets/lib/resized/431/1600x1200_0x0_d0b.jpg',
//   },
// ];

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
                    <img src={cities.image} alt={cities.name} />
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
