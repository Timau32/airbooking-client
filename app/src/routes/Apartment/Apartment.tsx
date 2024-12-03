import { CopyOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Carousel, DatePicker, Dropdown, Form, Image, Input, message, Tooltip, Typography } from 'antd';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Container } from '../../Components';
import LoadingComponents from '../../Components/Spinner/LoadingComponents';
import { getCookie } from '../../helpers/getCookie';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setSelectedApartment } from '../../store/reducers/apartmentSlices';
import classes from './Apartment.module.scss';

const baseUrl = process.env.REACT_APP_SERVER_API || 'https://houseagency.3730051-ri35659.twc1.net';

const { RangePicker } = DatePicker;

const Apartment = () => {
  const [loading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const mainSlideRef = useRef(null);
  const dotsSlideRef = useRef(null);
  const params = useParams<{ slug: string }>();

  const { selectedApartment } = useAppSelector((state) => state.apartment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedApartment) {
      fetchApartmentDetails();
    }
  }, []);

  const fetchApartmentDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.getApartmentDetail(params.slug!);
      dispatch(setSelectedApartment(response.data));
      console.log(response);
    } catch (err) {
      message.error('Что то пошло не так. Проверьте интернет соединение и попробуйте заново');
    } finally {
      setIsLoading(false);
    }
  };

  const onHeartClick = (event: MouseEvent) => {
    event.stopPropagation();
    const token = getCookie('auth-token');
    if (!token) message.warning('Ввойдите в аккаунт чтобы добавить в избранное');
  };

  return (
    <>
      <section className={classes.apartment}>
        <Container>
          {loading ? (
            <div style={{ margin: '400px 0' }}>
              <LoadingComponents />
            </div>
          ) : (
            <div className={classes.apartment_info}>
              <div className={classes.apartment_details}>
                <Typography.Title level={2}>{selectedApartment?.title}</Typography.Title>
                <div className={classes.apartment_slides}>
                  <Image.PreviewGroup>
                    <Carousel
                      className={classes.apartment_mainSlide}
                      ref={mainSlideRef}
                      asNavFor={dotsSlideRef.current!}
                      dots={false}
                      arrows={false}
                    >
                      {selectedApartment?.images.map((img) => (
                        <Image
                          className={classes.apartment_mainSlideItem}
                          src={baseUrl + img.image}
                          key={img.image}
                          alt='Apartment details'
                        />
                      ))}
                    </Carousel>
                  </Image.PreviewGroup>

                  <Carousel
                    ref={dotsSlideRef}
                    asNavFor={mainSlideRef.current!}
                    slidesToShow={selectedApartment?.images.length! > 6 ? 6 : selectedApartment?.images.length}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    draggable
                    infinite={false}
                    className={classes.apartment_dotsSlide}
                  >
                    {selectedApartment?.images.map((img) => (
                      <div className={classes.item} key={img.image}>
                        <img src={baseUrl + img.image} alt='Apartment details' />
                      </div>
                    ))}
                  </Carousel>
                </div>

                <div className={classes.apartment_description}>{selectedApartment?.description}</div>
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
                    <Form layout='vertical' form={form}>
                      <Form.Item name='date' label='Выберите дату' required>
                        <RangePicker placeholder={['Дата заезда', 'Дата отъезда']} />
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
          )}
        </Container>
      </section>
    </>
  );
};

export default Apartment;
