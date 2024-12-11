import { CopyOutlined, HeartOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Carousel,
  DatePicker,
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
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Container } from '../../Components';
import LoadingComponents from '../../Components/Spinner/LoadingComponents';
import { getCookie } from '../../helpers/getCookie';
import { pushUps } from '../../helpers/pushUps';
import views from '../../scss/variables/responsives.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setSelectedApartment } from '../../store/reducers/apartmentSlices';
import classes from './Apartment.module.scss';

const baseUrl = process.env.REACT_APP_SERVER_API || 'http://houseagency.3730051-ri35659.twc1.net';

const { RangePicker } = DatePicker;

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const Apartment = () => {
  const [loading, setIsLoading] = useState(false);
  const [isLaodingBooking, setIsLoadingBooking] = useState(false);
  const [form] = Form.useForm();
  const mainSlideRef = useRef<any>(null);
  const dotsSlideRef = useRef<any>(null);
  const params = useParams<{ slug: string }>();

  const { selectedApartment } = useAppSelector((state) => state.apartment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchApartmentDetails();
  }, []);

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
    const token = getCookie('auth-token');
    if (!token) message.warning('Ввойдите в аккаунт чтобы добавить в избранное');
    await api.setFavorite(selectedApartment?.slug!);
  };

  const onBookingFinish = async (values: { count: string; date: dayjs.Dayjs[] }) => {
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
      };

      await api.bookingApartment(payload);
      message.success('Вы успешно забронировали квартиру');
    } catch (err) {
      message.error('Не получается забронировать квартиру');
    } finally {
      setIsLoadingBooking(false);
    }
  };

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
              <Typography.Title level={2}>{selectedApartment?.title}</Typography.Title>
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

              <Typography.Title level={4}>Детальная информация</Typography.Title>

              <div
                className={classes.apartment_description}
                dangerouslySetInnerHTML={{ __html: selectedApartment?.description || '' }}
              />

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
            </div>
            <div className={classes.apartment_booking}>
              <div className={classes.sticky}>
                <div className={classes.apartment_actions}>
                  <span onClick={onHeartClick}>
                    <Tooltip title='Добавить в избранное'>
                      <HeartOutlined className={classes.latest_like} /> В избранное
                    </Tooltip>
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
                      <RangePicker disabledDate={disabledDate} showTime placeholder={['Дата заезда', 'Дата отъезда']} />
                    </Form.Item>

                    <Form.Item name='count' label='Введит количество гостей' required>
                      <Input type='number' placeholder='Количество гостей' />
                    </Form.Item>

                    <div className={classes.apartment_priceList}>
                      <span>Итого:</span>
                      <span>1900 сомов</span>
                    </div>

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
