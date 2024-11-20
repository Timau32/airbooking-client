import {
  CloseCircleOutlined,
  CloudOutlined,
  CoffeeOutlined,
  DatabaseOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  HomeOutlined,
  HourglassOutlined,
  KeyOutlined,
  MenuOutlined,
  MergeOutlined,
  MessageOutlined,
  MoonOutlined,
  NodeIndexOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShopOutlined,
  UserOutlined,
  WindowsOutlined
} from '@ant-design/icons';
import { Carousel, Divider, Menu, type MenuProps } from 'antd';
import classNames from 'classnames';
import { Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, SigninModal, SignupModal } from '../';
import logo from '../../assets/img/logo.png';
import views from '../../scss/variables/responsives.module.scss';
import classes from './HeadBar.module.scss';

type MenuItem = Required<MenuProps>['items'][number];
const menuExcludeItems = ['signin', 'languages', 'phone'];

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

const HeadBar = () => {
  const [isSigninOpen, setIsSigninOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSigninCancel = () => setIsSigninOpen(false);
  const onSignupCancel = () => setIsSignupOpen(false);

  const onSigninOpen = () => setIsSigninOpen(true);
  const onSignupOpen = () => setIsSignupOpen(true);

  const onMobileMenuOpen = () => setIsMobileMenuOpen(true);
  const onMobileMenuClose = () => setIsMobileMenuOpen(false);

  const scrollTop = () => window.scrollTo({ top: 0 });

  const items: MenuItem[] = [
    {
      key: '/support',
      label: 'Помощь',
      icon: <MessageOutlined className={classes.icon} />,
    },
    {
      key: '/cart',
      label: 'Избранное',
      icon: <HeartOutlined className={classes.icon} />,
    },
    {
      key: 'singin',
      label: 'Войти',
      icon: <UserOutlined className={classes.icon} />,
      onClick: onSigninOpen,
    },

    {
      key: 'search',
      label: 'Поиск',
      icon: <SearchOutlined className={classes.icon} />,
      onClick: scrollTop,
    },

    {
      key: 'phone',
      label: '+996 772 61 91 05',
      icon: <PhoneOutlined className={classes.icon} />,
      onClick: () => (window.location.href = 'tel:+996772619105'),
    },
  ];

  const onClick: MenuProps['onClick'] = (event) => {
    if (menuExcludeItems.includes(event.key)) return;
    navigate(event.key);
  };

  return (
    <>
      <header className={classes.head}>
        <Container>
          <div className={classes.head_navbar}>
            <Link to='/' style={{ color: '#fff' }}>
              <img className={classes.logo} src={logo} alt='Logo' />
            </Link>
            <ul className={classes.head_menu}>
              <li className={classes.head_item}>
                <Link to='/support'>
                  <MessageOutlined className={classes.icon} /> Помощь
                </Link>
                <div className='line'></div>
              </li>
              <li className={classes.head_item}>
                <Link to='/cart'>
                  <HeartOutlined className={classes.icon} /> Избранное
                </Link>
                <div className='line'></div>
              </li>
              <li className={classes.head_item}>
                <span onClick={onSigninOpen}>
                  <UserOutlined className={classes.icon} /> Войти
                </span>
                <div className='line'></div>
              </li>
              <li className={classes.head_item}>
                <Link to='/' onClick={scrollTop}>
                  <SearchOutlined className={classes.icon} /> Поиск
                </Link>
                <div className='line'></div>
              </li>
              <li className={classes.head_item}>
                <Link to='tel:+996772619105'>
                  <PhoneOutlined className={classes.icon} /> +996 772 61 91 05
                </Link>
                <div className='line'></div>
              </li>
            </ul>
            <MenuOutlined onClick={onMobileMenuOpen} className={classes.head_burgerMenu} />
          </div>
        </Container>
        <div className={classNames(classes.mobile_menu, isMobileMenuOpen ? classes.opened : undefined)}>
          <CloseCircleOutlined onClick={onMobileMenuClose} className={classes.mobile_close} />
          <Menu items={items} theme='dark' onClick={onClick} />
        </div>
        <Divider className={classes.head_divider} />

        <Container>
          <Carousel
            slidesToShow={7}
            slidesToScroll={4}
            slide='10'
            className={classes.head_category}
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
              <div key={`category-${id}`} className={classes.head_category_item}>
                {icon} {label}
              </div>
            ))}
          </Carousel>
        </Container>
      </header>

      {isSigninOpen && (
        <Suspense fallback={<div />}>
          <SigninModal isOpen={isSigninOpen} onCancel={onSigninCancel} onSingupOpen={onSignupOpen} />
        </Suspense>
      )}
      {isSignupOpen && (
        <Suspense fallback={<div />}>
          <SignupModal isOpen={isSignupOpen} onCancel={onSignupCancel} onSigninOpen={onSigninOpen} />
        </Suspense>
      )}
    </>
  );
};

export default HeadBar;
