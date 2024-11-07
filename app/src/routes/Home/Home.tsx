import { ApartmentList, Container, Search } from '../../Components';
import { Flex, Typography } from 'antd';
import classes from './Home.module.scss';

const lattestMocks = [
  {
    id: 1,
    title: '2x rooms around Sulaiman-too',
    img: 'https://avatars.mds.yandex.net/get-vertis-journal/4469561/cover.jpg_1704460151500/orig',
  },
  {
    id: 2,
    title: '2x rooms / шикарный вид на закат',
    img: 'https://asiamountains.net/assets/cache_image/assets/lib/resized/857/1600x1207_0x0_d0b.jpg',
  },
  {
    id: 3,
    title: 'Керме тоо',
    img: 'https://thumbs.dreamstime.com/b/%D0%B2%D0%B8%D0%B4-%D0%BD%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4-%D0%BE%D1%88-%D0%B2%D0%BE-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F-%D0%B7%D0%B0%D0%BA%D0%B0%D1%82%D0%B0-%D0%BA%D1%8B%D1%80%D0%B3%D1%8B%D0%B7%D1%81%D1%82%D0%B0%D0%BD%D0%B0-%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0-%D1%81-%D0%B3%D0%BE%D1%80%D1%8B-213463263.jpg',
  },
  {
    id: 4,
    title: 'С солнечным виддом',
    img: 'https://st-1.akipress.org/cdn-st-0/qX5/Q/820250.cb171f0603b20cf34e4930b1bfa4c6a9.jpg',
  },
  {
    id: 5,
    title: '2x rooms Квартира',
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/552590468.jpg?k=ba8b21bfde4a248b41e90242e79398ba6ac61f0a37886c99badf4a8ce1099f4b&o=&hp=1',
  },
  {
    id: 6,
    title: '2x rooms Дом с видом на гору',
    img: 'https://motohorek.life/wp-content/uploads/2021/09/E3EC2819-1DFF-41CC-9EF6-50E329023B2E-1024x683.jpeg',
  },
  {
    id: 7,
    title: 'Люкс квартира',
    img: 'https://asiamountains.net/assets/cache_image/assets/lib/resized/431/1600x1200_0x0_d0b.jpg',
  },
];

const citiesMocks = [
  {
    id: 1,
    title: 'Иссык-Куль',
    img: 'https://avatars.mds.yandex.net/get-vertis-journal/4469561/cover.jpg_1704460151500/orig',
  },
  {
    id: 2,
    title: 'Далал-Абад',
    img: 'https://asiamountains.net/assets/cache_image/assets/lib/resized/857/1600x1207_0x0_d0b.jpg',
  },
  {
    id: 3,
    title: 'Талас',
    img: 'https://thumbs.dreamstime.com/b/%D0%B2%D0%B8%D0%B4-%D0%BD%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4-%D0%BE%D1%88-%D0%B2%D0%BE-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F-%D0%B7%D0%B0%D0%BA%D0%B0%D1%82%D0%B0-%D0%BA%D1%8B%D1%80%D0%B3%D1%8B%D0%B7%D1%81%D1%82%D0%B0%D0%BD%D0%B0-%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0-%D1%81-%D0%B3%D0%BE%D1%80%D1%8B-213463263.jpg',
  },
  {
    id: 4,
    title: 'Ош',
    img: 'https://st-1.akipress.org/cdn-st-0/qX5/Q/820250.cb171f0603b20cf34e4930b1bfa4c6a9.jpg',
  },
  {
    id: 5,
    title: 'Бишкек',
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/552590468.jpg?k=ba8b21bfde4a248b41e90242e79398ba6ac61f0a37886c99badf4a8ce1099f4b&o=&hp=1',
  },
  {
    id: 6,
    title: 'Нарын',
    img: 'https://motohorek.life/wp-content/uploads/2021/09/E3EC2819-1DFF-41CC-9EF6-50E329023B2E-1024x683.jpeg',
  },
  {
    id: 7,
    title: 'Баткен',
    img: 'https://asiamountains.net/assets/cache_image/assets/lib/resized/431/1600x1200_0x0_d0b.jpg',
  },
];

const Home = () => {
  return (
    <>
      <section className={classes.section}>
        <Container>
          <div className={classes.search_align}>
            <Typography.Title>Найдём, где остановиться!</Typography.Title>
            <Search />
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <Typography.Title className={classes.text_center} level={2}>
            Идеи для отпуска
          </Typography.Title>
          <div className={classes.latest_apartments}>
            <ApartmentList>
              {lattestMocks.map((apartment) => (
                <div className={classes.latest_item} key={`apartment-${apartment.id}`}>
                  <div className={classes.latest_body}>
                    <img src={apartment.img} alt={apartment.title} />
                    <Typography.Paragraph className={classes.latest_title}>{apartment.title}</Typography.Paragraph>
                  </div>
                </div>
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
              {lattestMocks.map((apartment) => (
                <div className={classes.latest_item} key={`apartment-${apartment.id}`}>
                  <div className={classes.latest_body}>
                    <img src={apartment.img} alt={apartment.title} />
                    <Typography.Paragraph className={classes.latest_title}>{apartment.title}</Typography.Paragraph>
                  </div>
                </div>
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
              {citiesMocks.map((apartment) => (
                <div className={classes.latest_item} key={`apartment-${apartment.id}`}>
                  <div className={classes.latest_body}>
                    <p className={classes.cities_results}>
                      {new Intl.NumberFormat('de-DE').format(Math.floor(Math.random() * 10000))} вариантов
                    </p>
                    <img src={apartment.img} alt={apartment.title} />
                    <Typography.Paragraph className={classes.latest_title}>{apartment.title}</Typography.Paragraph>
                  </div>
                </div>
              ))}
            </Flex>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
