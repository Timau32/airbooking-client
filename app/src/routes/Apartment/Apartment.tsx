import { CopyOutlined, HeartFilled, HeartOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Carousel,
  Collapse,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Image,
  Input,
  List,
  message,
  Rate,
  Tooltip,
  Typography,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import Leaflet from 'leaflet';
import { ItemType } from 'rc-collapse/es/interface';
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Container, GroupList } from '../../Components';
import MapView from '../../Components/Map';
import LoadingComponents from '../../Components/Spinner/LoadingComponents';
import { changeIsFavorite, pushUps } from '../../helpers';
import { getCookie } from '../../helpers/getCookie';
import views from '../../scss/variables/responsives.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setSelectedApartment } from '../../store/reducers/apartmentSlices';
import classes from './Apartment.module.scss';
import { bookingStatusEnum, IBooking } from '../../interfaces';

const baseUrl = process.env.REACT_APP_SERVER_API || 'http://houseagency.3730051-ri35659.twc1.net';

const { RangePicker } = DatePicker;

const Apartment = () => {
  const [loading, setIsLoading] = useState(false);
  const [isLaodingBooking, setIsLoadingBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking[]>([]);
  const [form] = Form.useForm();
  const mainSlideRef = useRef<any>(null);
  const dotsSlideRef = useRef<any>(null);
  const params = useParams<{ slug: string }>();

  const { selectedApartment } = useAppSelector((state) => state.apartment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchApartmentDetails();
    api
      .getApartmentOccupied(params.slug!)
      .then((res) =>
        setSelectedBooking(res.data.occupied_dates.filter(({ status }) => status === bookingStatusEnum.APPROVED))
      )
      .catch((err) => {
        message.error(pushUps.DEFAULT_FETCH_ERROR);
        console.log(err);
      });
  }, []);

  const disableSpecificDates: RangePickerProps['disabledDate'] = (current, info) => {
    const days = dayjs().endOf('day');
    const disabledBeforToday = current && current < days;
    const disabledSpecificDates = selectedBooking.some(
      ({ start_date, end_date }) => current > dayjs(start_date).endOf('day') && current < dayjs(end_date).endOf('day')
    );

    // Disable dates that match those in the disabledDates array
    return disabledBeforToday || disabledSpecificDates;
  };

  const fetchApartmentDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.getApartmentDetail(params.slug!);
      dispatch(setSelectedApartment(response.data));
    } catch (err) {
      message.error(pushUps.DEFAULT_FETCH_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const onHeartClick = async (event: MouseEvent) => {
    event.stopPropagation();
    await changeIsFavorite(selectedApartment!);
    dispatch(setSelectedApartment({ ...selectedApartment!, is_favorite: !selectedApartment?.is_favorite }));
  };

  const onBookingFinish = async (values: { count: string; date: dayjs.Dayjs[]; phone_number: string }) => {
    try {
      setIsLoadingBooking(true);
      const token = getCookie('auth-token');
      if (!token) return message.warning('Ввойдите в аккаунт чтобы добавить в избранное');

      const startDate = values.date[0];
      const endDate = values.date[1];
      const payload = {
        property: selectedApartment?.slug!,
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        start_time: startDate.format('HH:mm'),
        end_time: endDate.format('HH:mm'),
        number_of_guests: Number(values.count),
        phone_number: values.phone_number,
      };

      await api.bookingApartment(payload);
      message.success('Вы успешно забронировали квартиру');
      form.resetFields();
    } catch (err) {
      message.error('Не получается забронировать квартиру');
    } finally {
      setIsLoadingBooking(false);
    }
  };

  const bounds = new Leaflet.LatLngBounds(
    selectedApartment?.locations.map(({ latitude, longitude }) => [latitude, longitude]) || []
  );

  return (
    <>
      <section className={classes.apartment}>
        <Container>
          {loading ? (
            <div style={{ margin: '400px 0' }}>
              <LoadingComponents />
            </div>
          ) : null}
          <div className={classes.apartment_info}>
            <div className={classes.apartment_details}>
              <Typography.Title level={2} className={classes.title}>
                {selectedApartment?.title}
              </Typography.Title>
              <Typography.Title level={5} className={classes.price}>
                Цена: {selectedApartment?.price} сомов в сутки
                <div className={classes.line}></div>
              </Typography.Title>
              <div className={classes.apartment_slides}>
                <Image.PreviewGroup>
                  <Carousel
                    className={classes.apartment_mainSlide}
                    ref={mainSlideRef}
                    asNavFor={dotsSlideRef.current}
                    dots={false}
                    arrows={false}
                    responsive={[
                      {
                        breakpoint: Number(views.mobile),
                        settings: {
                          draggable: true,
                          dots: true,
                        },
                      },
                    ]}
                  >
                    {selectedApartment?.images.map((img) => (
                      <Image
                        className={classes.apartment_mainSlideItem}
                        src={img.image.startsWith('http') ? img.image : baseUrl + img.image}
                        key={img.image}
                        alt='Apartment details'
                      />
                    ))}
                  </Carousel>
                </Image.PreviewGroup>

                <Carousel
                  asNavFor={mainSlideRef.current}
                  slidesToShow={selectedApartment?.images.length! > 6 ? 6 : selectedApartment?.images.length || 1}
                  style={
                    {
                      '--slide-length':
                        selectedApartment?.images.length! > 6 ? 6 : selectedApartment?.images.length || 1,
                    } as CSSProperties
                  }
                  ref={dotsSlideRef}
                  dots={false}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  infinite={false}
                  draggable
                  responsive={[
                    {
                      breakpoint: Number(views.mobile),
                      settings: {
                        draggable: true,
                        slidesToShow: selectedApartment?.images.length! > 3 ? 3 : selectedApartment?.images.length || 1,
                      },
                    },
                  ]}
                  className={classes.apartment_dotsSlide}
                >
                  {selectedApartment?.images.map((img) => (
                    <div className={classes.item} key={img.image}>
                      <img
                        src={img.image.startsWith('http') ? img.image : baseUrl + img.image}
                        alt='Apartment details'
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              {selectedApartment?.locations[0] && (
                <Typography.Title level={5}>
                  {selectedApartment?.locations[0].address ? selectedApartment?.locations[0].address + ',' : ''}{' '}
                  {selectedApartment.locations[0]?.city?.name || ''}
                </Typography.Title>
              )}

              <Typography.Paragraph>
                {selectedApartment?.room_count} комнат <Divider type='vertical' style={{ borderWidth: 2 }} />
                {selectedApartment?.max_guests} гостей <Divider type='vertical' style={{ borderWidth: 2 }} />
                {selectedApartment?.bathroom_count} ванная <Divider type='vertical' style={{ borderWidth: 2 }} />
                {selectedApartment?.bed_count} кровати
              </Typography.Paragraph>

              <Typography.Title level={4}>Детальная информация</Typography.Title>

              <div
                className={classes.apartment_description}
                dangerouslySetInnerHTML={{ __html: selectedApartment?.description || '' }}
              />

              {Boolean(selectedApartment?.related_group_properties?.length) && (
                <GroupList items={selectedApartment?.related_group_properties!} />
              )}

              {Boolean(selectedApartment?.amenities.length) && (
                <div className={classes.amenities}>
                  <Typography.Title level={4}> Удобства </Typography.Title>

                  <div className={classes.amenities_container}>
                    {selectedApartment?.amenities.map((amenti) => (
                      <div key={amenti.slug} className={classes.amenities_item}>
                        {amenti.icon !== 'None' && amenti.icon !== ',' && (
                          <FontAwesomeIcon icon={amenti.icon?.split(',') as any} />
                        )}{' '}
                        {amenti.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={classes.reviews}>
                <Typography.Title level={4}> Комментарии </Typography.Title>
                <List
                  className={classes.reviews_list}
                  itemLayout='horizontal'
                  dataSource={selectedApartment?.reviews}
                  renderItem={(review) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ marginTop: '11px' }} icon={<UserOutlined />} />}
                        title={
                          <div className={classes.reviews_description}>
                            <strong>{review.full_name || 'Аноним'} </strong>
                            <div>
                              <Rate disabled value={review.rating} />
                            </div>
                          </div>
                        }
                        description={
                          <div className={classes.reviews_description}>
                            <p>{review.comment}</p>
                            <small>{new Date(review.created_at).toLocaleString()}</small>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>

              {selectedApartment?.locations[0] && (
                <div className={classes.map}>
                  <Typography.Title level={4}>Местоположение</Typography.Title>
                  <Typography.Paragraph>
                    {' '}
                    {selectedApartment?.locations[0].address + ',' || ''}{' '}
                    {selectedApartment?.locations[0]?.city?.name || ''}
                  </Typography.Paragraph>

                  <div className={classes.map_container}>
                    <MapView dragging={false} apartments={[selectedApartment]} bounds={bounds} zoom={13} />
                  </div>
                </div>
              )}
            </div>
            <div className={classes.apartment_booking}>
              <div className={classes.sticky}>
                <div className={classes.apartment_actions}>
                  <span onClick={onHeartClick}>
                    {!selectedApartment?.is_favorite ? (
                      <Tooltip title='Добавить в избранное'>
                        <>
                          <HeartOutlined className={classes.latest_like} /> В избранное
                        </>
                      </Tooltip>
                    ) : (
                      <Tooltip title='Убрать из избранных'>
                        <>
                          <HeartFilled className={classes.latest_like} style={{ color: 'red' }} /> Убрать из избранных
                        </>
                      </Tooltip>
                    )}
                  </span>{' '}
                  <Dropdown
                    trigger={['click']}
                    menu={{
                      items: [
                        {
                          key: '0',
                          label: (
                            <span>
                              <CopyOutlined /> Копировать ссылку
                            </span>
                          ),
                          onClick: () => {
                            navigator.clipboard.writeText(window.location.href);
                            message.success('Ссылка скопирована в буфер обмена');
                          },
                        },
                      ],
                    }}
                  >
                    <span>
                      <ShareAltOutlined className={classes.latest_like} /> Поделиться
                    </span>
                  </Dropdown>
                </div>
                <div className={classes.apartment_bookingCard}>
                  <Form onFinish={onBookingFinish} layout='vertical' form={form}>
                    <Form.Item name='date' label='Выберите дату' required>
                      <RangePicker disabledDate={disableSpecificDates} placeholder={['Дата заезда', 'Дата отъезда']} />
                    </Form.Item>

                    <Form.Item name='count' label='Введит количество гостей' required>
                      <Input type='number' placeholder='Количество гостей' />
                    </Form.Item>

                    <Form.Item name='phone_number' label='Введит номер телефона для связи' required>
                      <Input type='tel' placeholder='+999 999 99 99 99' />
                    </Form.Item>

                    <Form.Item shouldUpdate>
                      {() => {
                        const dates = form.getFieldValue('date') as dayjs.Dayjs[];
                        const items: ItemType[] = [];
                        let diff = undefined;
                        if (dates) {
                          const startDate = dates[0];
                          const endDate = dates[1];
                          diff = Math.abs(startDate.diff(endDate, 'day'));

                          items.push({
                            key: 'more',
                            label: 'Подробнее',
                            children: (
                              <>
                                <div>
                                  <span>Количество суток:</span> <span>{diff}</span>
                                </div>
                                <div>
                                  <span>
                                    {diff} суток х {selectedApartment?.price} сомов ={' '}
                                    {Number(selectedApartment?.price) * diff} сомов
                                  </span>
                                </div>
                              </>
                            ),
                          });
                        }

                        return (
                          <>
                            <div className={classes.apartment_priceList}>
                              <span>Итого:</span>
                              <span>
                                {diff ? Number(selectedApartment?.price) * diff : Number(selectedApartment?.price)}{' '}
                                сомов
                              </span>
                            </div>
                            {diff && <Collapse items={items} />}
                          </>
                        );
                      }}
                    </Form.Item>

                    <Form.Item shouldUpdate>
                      {() => (
                        <Button
                          type='primary'
                          htmlType='submit'
                          loading={isLaodingBooking}
                          disabled={
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                          }
                        >
                          Забронировать
                        </Button>
                      )}
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Apartment;
