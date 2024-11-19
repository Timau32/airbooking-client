import { Divider, Flex, Typography } from 'antd';
import Container from '../Container/Container';
import classes from './Footer.module.scss';
import { GooglePlusOutlined, TwitterOutlined, WhatsAppOutlined, YoutubeOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <>
      <footer className={classes.footer}>
        <Container>
          <Flex className={classes.footer_container} justify='space-between'>
            <div className={classes.footer_item}>
              <Typography.Title> Logo</Typography.Title>
            </div>
            <div className={classes.footer_item}>
              <Typography.Title level={4}>Гостям</Typography.Title>

              <div className={classes.footer_links}>
                <Typography.Link href='/'>
                  <p>Отзывы гостей</p>
                  <div className='line'></div>
                </Typography.Link>
                <Typography.Link href='/'>
                  <p>Кэшбэк 30%</p>
                  <div className='line'></div>
                </Typography.Link>
                <Typography.Link href='/'>
                  <p>Идеи для путешествий</p>
                  <div className='line'></div>
                </Typography.Link>
                <Typography.Link href='/'>
                  <p>Гарантии</p>
                  <div className='line'></div>
                </Typography.Link>
              </div>
            </div>
            <div className={classes.footer_item}>
              <Typography.Title level={4}>Хозяевам жилья</Typography.Title>

              <div className={classes.footer_links}>
                <Typography.Link href='/'>
                  <p>Как сдавать жильё</p>
                  <div className='line'></div>
                </Typography.Link>
                <Typography.Link href='/'>
                  <p>Разместить объявление</p>
                  <div className='line'></div>
                </Typography.Link>
                <Typography.Link href='/'>
                  <p>Бесплатное страхование</p>
                  <div className='line'></div>
                </Typography.Link>
                <Typography.Link href='/'>
                  <p>Помощь</p>
                  <div className='line'></div>
                </Typography.Link>
              </div>
            </div>
            <div className={classes.footer_item}>
              <Typography.Title level={4}>О нас</Typography.Title>

              <div className={classes.footer_links}>
                <Typography.Link href='/'>
                  <p>Реферальная программа</p>
                  <div className='line'></div>
                </Typography.Link>
                <Typography.Link href='/'>
                  <p>Реквизиты</p>
                  <div className='line'></div>
                </Typography.Link>
                <Typography.Link href='/'>
                  <p>Вакансии</p>
                  <div className='line'></div>
                </Typography.Link>
              </div>
            </div>
          </Flex>

          <Divider className={classes.footer_divider}></Divider>

          <div className={classes.footer_socials}>
            <Typography.Title level={3}>Подписывайтесь на нас</Typography.Title>

            <div className={classes.footer_icons}>
              <span className={classes.footer_icon}>
                <GooglePlusOutlined className={classes.size} />
              </span>
              <span className={classes.footer_icon}>
                <YoutubeOutlined className={classes.size} />
              </span>
              <span className={classes.footer_icon}>
                <WhatsAppOutlined className={classes.size} />
              </span>
              <span className={classes.footer_icon}>
                <TwitterOutlined className={classes.size} />
              </span>
            </div>
          </div>
        </Container>
      </footer>

      <div className={classes.footer_reserved}>
        <Container>
          <Typography.Paragraph>
            © 2011—2024 Airbooking. All rights reserved by{' '}
            <Typography.Link href='/'>airbooking.com</Typography.Link> & created by {" "}
            <Typography.Link href='/'>codexstudio</Typography.Link>
          </Typography.Paragraph>
        </Container>
      </div>
    </>
  );
};

export default Footer;
