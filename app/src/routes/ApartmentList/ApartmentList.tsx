import { Button, Carousel, Checkbox, Collapse, Divider, Drawer, Flex, List, Typography } from 'antd';
import Leaflet, { LatLngTuple } from 'leaflet';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Search } from '../../Components';
import MapView from '../../Components/Map';
import LoadingComponents from '../../Components/Spinner/LoadingComponents';
import { fetchSearchData } from '../../store/creators/searchActions';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import classes from './ApartmentList.module.scss';

const ApartmentList = () => {
  const [isLaodingSearch, setIsLoadingSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { searchedApartments, categories, cities } = useAppSelector((state) => state.apartment);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const categoriesTerm = searchParams.get('categories');
  const citiesTerm = searchParams.get('cities');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (term: string) => {
      setIsLoadingSearch(true);
      await dispatch(fetchSearchData(term));
      setIsLoadingSearch(false);
    };

    if (!searchedApartments.length) {
      fetchData(searchTerm!);
    }
  }, []);

  const filteredApartments = useMemo(() => {
    const categoryFilter = categoriesTerm?.split(' ').filter((str) => Boolean(str));
    const cityFilter = citiesTerm?.split(' ').filter((str) => Boolean(str));

    return searchedApartments.filter((apartment) => {
      let filtereds = true;

      if (categoryFilter?.length) {
        filtereds = categoryFilter.some((categorySlug) =>
          Boolean(apartment.categories.find(({ id }) => String(id) === categorySlug))
        );
      }

      if (cityFilter?.length) {
        filtereds = cityFilter.some((categorySlug) =>
          Boolean(apartment.locations.find((location) => location.city?.id === Number(categorySlug)))
        );
      }

      return filtereds;
    });
  }, [searchedApartments, categoriesTerm, citiesTerm]);

  const onNavigateToItem = (slug: string) => {
    navigate(`/apartments/${slug}`);
  };

  const onFiltersClose = () => setIsOpen(false);

  const positions = filteredApartments.reduce(
    (accum: any, house) => [...accum, ...house.locations.map(({ latitude, longitude }) => [latitude, longitude])],
    [] as LatLngTuple[]
  );

  const bounds = new Leaflet.LatLngBounds(positions);
  const categoryCheckeds = useMemo(() => categoriesTerm?.split(' ').filter((str) => Boolean(str)), [categoriesTerm]);
  const citiesCheckeds = useMemo(() => citiesTerm?.split(' ').filter((str) => Boolean(str)), [citiesTerm]);

  const onCategoryChange = (value: string[]) =>
    navigate(`/apartments/list?search=${searchTerm}&categories=${value.join(' ')}&cities=${citiesTerm || ''}`);
  const onCitiesChange = (value: string[]) =>
    navigate(`/apartments/list?search=${searchTerm}&categories=${categoriesTerm || ''}&cities=${value.join(' ')}`);
  return (
    <>
      <Drawer open={isOpen} onClose={onFiltersClose}>
        <Typography.Title level={5}>Выберите фильтры</Typography.Title>
        <Collapse
          items={[
            {
              label: 'Категории',
              key: 'categories',
              children: (
                <Checkbox.Group
                  onChange={onCategoryChange}
                  value={categoryCheckeds}
                  style={{ flexDirection: 'column' }}
                >
                  {categories.map((category) => (
                    <div key={`category-${category.id}`}>
                      <Checkbox value={String(category.id)}>{category.name}</Checkbox>
                    </div>
                  ))}
                </Checkbox.Group>
              ),
            },

            {
              label: 'Города',
              key: 'cities',
              children: (
                <Checkbox.Group onChange={onCitiesChange} value={citiesCheckeds} style={{ flexDirection: 'column' }}>
                  {cities.map((city) => (
                    <div key={`city-${city.id}`}>
                      <Checkbox value={String(city.id)}>{city.name}</Checkbox>
                    </div>
                  ))}
                </Checkbox.Group>
              ),
            },
          ]}
        />
      </Drawer>
      <section className={classes.cart}>
        <div className={classes.content}>
          <Container>
            <div className={classes.search}>
              <Search />
            </div>
            <Typography.Title level={4} className={classes.title}>
              <div className={classes.swipe}></div>
              Результаты поиска по запросу: {searchTerm === 'all' ? 'Все' : searchTerm}
            </Typography.Title>
            <List
              itemLayout='vertical'
              size='large'
              loading={isLaodingSearch}
              header={
                <Flex justify='space-between' className={classes.managment}>
                  <Button onClick={() => setIsOpen(true)}>Включить фильтры</Button>
                  <div style={{ textAlign: 'right' }}>
                    <b>Общее количество по результату поиска:</b> {filteredApartments.length}
                  </div>
                </Flex>
              }
              pagination={{
                pageSize: 10,
              }}
              dataSource={filteredApartments}
              renderItem={(item, index) => (
                <List.Item
                  style={{ width: '100%' }}
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
                  <div className={classes.description} dangerouslySetInnerHTML={{ __html: item.description }} />
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
                  <Typography.Paragraph>
                    <b>Цена:</b> {item.price} сом
                  </Typography.Paragraph>
                </List.Item>
              )}
            />
          </Container>
        </div>

        <div className={classes.mapContainer}>
          <MapView zoom={13} apartments={filteredApartments} bounds={bounds} />
        </div>
      </section>
      {isLaodingSearch && <LoadingComponents />}
    </>
  );
};

export default ApartmentList;
