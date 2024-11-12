import { HeartOutlined, MessageOutlined, PhoneOutlined, TranslationOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Container, SigninModal, SignupModal } from '../';
import classes from './HeadBar.module.scss';
import { Suspense, useState } from 'react';

const HeadBar = () => {
  const [isSigninOpen, setIsSigninOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);

  const onSigninCancel = () => setIsSigninOpen(false);
  const onSignupCancel = () => setIsSignupOpen(false);
  const onSigninOpen = () => setIsSigninOpen(true);
  const onSignupOpen = () => setIsSignupOpen(true);

  return (
    <>
      <header className={classes.head}>
        <Container>
          <div className={classes.head_navbar}>
            <h1>
              <Link to='/' style={{ color: '#fff' }}>
                Logo
              </Link>
            </h1>
            <ul className={classes.head_menu}>
              <li className={classes.head_item}>
                <Link to='/support'>
                  <MessageOutlined className={classes.icon} /> Помощь
                </Link>
                <div className='line'></div>
              </li>
              <li className={classes.head_item}>
                <Link to='/'>
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
                <Link to='/'>
                  <TranslationOutlined className={classes.icon} /> Языки
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
          </div>
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
