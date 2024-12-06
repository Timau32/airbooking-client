import {
  CloseCircleOutlined,
  HeartOutlined,
  MenuOutlined,
  MessageOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';
import classNames from 'classnames';
import { Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, SigninModal, SignupModal } from '../';
import logo from '../../assets/img/logo-white.png';
import { deleteCookie } from '../../helpers/getCookie';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setIsLogined } from '../../store/reducers/apartmentSlices';
import classes from './HeadBar.module.scss';

type MenuItem = Required<MenuProps>['items'][number];
const menuExcludeItems = ['signin', 'languages', 'phone'];

const HeadBar = () => {
  const [isSigninOpen, setIsSigninOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isLogined } = useAppSelector((state) => state.apartment);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSigninCancel = () => setIsSigninOpen(false);
  const onSignupCancel = () => setIsSignupOpen(false);

  const onSigninOpen = () => setIsSigninOpen(true);
  const onSignupOpen = () => setIsSignupOpen(true);

  const onMobileMenuOpen = () => setIsMobileMenuOpen(true);
  const onMobileMenuClose = () => setIsMobileMenuOpen(false);

  const scrollTop = () => window.scrollTo({ top: 0 });
  const logout = () => {
    navigate('/');
    deleteCookie('auth-token');
    deleteCookie('refresh');
    dispatch(setIsLogined(false));
  };

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
      label: isLogined ? 'Выйти' : 'Войти',
      icon: <UserOutlined className={classes.icon} />,
      onClick: isLogined ? logout : onSigninOpen,
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
                <span onClick={isLogined ? logout : onSigninOpen}>
                  <UserOutlined className={classes.icon} /> {isLogined ? 'Выйти' : 'Войти'}
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

      <div className={classes.mobile_bottomBar}>
        <div className={classes.mobile_bottomBar_actions}>
            <Link to='/' onClick={scrollTop} className={classes.mobile_bottomBar_item}>
              <SearchOutlined className={classes.mobile_bottomBar_icon} /> <span>Поиск</span>
            </Link>
            <Link to='/cart'className={classes.mobile_bottomBar_item}>
              <HeartOutlined className={classes.mobile_bottomBar_icon} /> <span>Избранное</span>
            </Link>
          <div className={classes.mobile_bottomBar_item} onClick={isLogined ? logout : onSigninOpen}>
            <UserOutlined className={classes.mobile_bottomBar_icon} /> <span>{isLogined ? 'Выйти' : 'Войти'}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadBar;
