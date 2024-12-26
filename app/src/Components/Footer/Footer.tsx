import {
  GooglePlusOutlined,
  InstagramOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import logo from '../../assets/img/logo-white.png';
import { IInfo } from '../../interfaces';
import { fetchInfo } from '../../store/creators/searchActions';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import Container from '../Container/Container';
import classes from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { info, globalSettings } = useAppSelector((state) => state.apartment);
  const dispatch = useAppDispatch();
  const CATEGORY_CHOICES = ['other', 'for_guests', 'for_hosts', 'about'];
  const infoStore: Record<string, IInfo[]> = useMemo(() => {
    const store: Record<string, IInfo[]> = {};

    CATEGORY_CHOICES.forEach((key) => {
      store[key] = info.filter(({ category }) => category === key);
    });

    return store;
  }, [info]);

  useEffect(() => {
    dispatch(fetchInfo());
  }, []);
  return (
    <>
      <footer className={classes.footer}>
        <Container>
          <Flex className={classes.footer_container} justify='space-between'>
            <div className={classes.footer_item}>
              <img src={logo} alt='Logo' />
            </div>
            <div className={classes.footer_item}>
              <Typography.Title level={4}>Гостям</Typography.Title>

              <div className={classes.footer_links}>
                {infoStore?.for_guests &&
                  infoStore.for_guests.map(({ slug, title }) => (
                    <Typography.Link key={slug} href={`/info/${slug}`}>
                      <p>{title}</p>
                      <div className='line'></div>
                    </Typography.Link>
                  ))}
              </div>
            </div>
            <div className={classes.footer_item}>
              <Typography.Title level={4}>Хозяевам жилья</Typography.Title>

              <div className={classes.footer_links}>
                {infoStore?.for_hosts &&
                  infoStore.for_hosts.map(({ slug, title }) => (
                    <Typography.Link key={slug} href={`/info/${slug}`}>
                      <p>{title}</p>
                      <div className='line'></div>
                    </Typography.Link>
                  ))}
              </div>
            </div>
            <div className={classes.footer_item}>
              <Typography.Title level={4}>О нас</Typography.Title>

              <div className={classes.footer_links}>
                {infoStore.about &&
                  infoStore.about.map(({ slug, title }) => (
                    <Typography.Link key={slug} href={`/info/${slug}`}>
                      <p>{title}</p>
                      <div className='line'></div>
                    </Typography.Link>
                  ))}
              </div>
            </div>
          </Flex>

          <Divider className={classes.footer_divider}></Divider>

          <div className={classes.footer_socials}>
            <Typography.Title level={3}>Подписывайтесь на нас</Typography.Title>

            <div className={classes.footer_icons}>
              <Typography.Link href={globalSettings?.gmail} target='_blank' className={classes.footer_icon}>
                <GooglePlusOutlined className={classes.size} />
              </Typography.Link>
              <Typography.Link href={globalSettings?.facebook} target='_blank' className={classes.footer_icon}>
                <FontAwesomeIcon icon={faFacebook} className={classes.size} />
              </Typography.Link>
              <Typography.Link href={globalSettings?.whatsapp} target='_blank' className={classes.footer_icon}>
                <WhatsAppOutlined className={classes.size} />
              </Typography.Link>
              <Typography.Link href={globalSettings?.telegram} target='_blank' className={classes.footer_icon}>
                <FontAwesomeIcon icon={faTelegram} className={classes.size} />
              </Typography.Link>
              <Typography.Link href={globalSettings?.instagram} target='_blank' className={classes.footer_icon}>
                <InstagramOutlined className={classes.size} />
              </Typography.Link>
            </div>
          </div>
        </Container>
      </footer>

      <div className={classes.footer_reserved}>
        <Container>
          <Typography.Paragraph>
            © 2011—2024 Airbooking. All rights reserved by <Typography.Link href='/'>airbooking.com</Typography.Link> &
            created by{' '}
            <Typography.Link href='https://t.me/Utima' target='_blank'>
              bigbee.world
            </Typography.Link>
          </Typography.Paragraph>
        </Container>
      </div>
    </>
  );
};

export default Footer;
