import { HeartOutlined, MessageOutlined, PhoneOutlined, TranslationOutlined, UserOutlined } from '@ant-design/icons';
import { Container } from '../';
import classes from './HeadBar.module.scss';

const HeadBar = () => {
  return (
    <header className={classes.head}>
      <Container>
        <div className={classes.head_navbar}>
          <h1>Logo</h1>
          <ul className={classes.head_menu}>
            <li className={classes.head_item}>
              <span>
                <MessageOutlined className={classes.icon} /> Помощь
              </span>
              <div className='line'></div>
            </li>
            <li className={classes.head_item}>
              <span>
                <HeartOutlined className={classes.icon} /> Избранное
              </span>
              <div className='line'></div>
            </li>
            <li className={classes.head_item}>
              <span>
                <UserOutlined className={classes.icon} /> Войти
              </span>
              <div className='line'></div>
            </li>
            <li className={classes.head_item}>
              <span>
                <TranslationOutlined  className={classes.icon} /> Языки
              </span>
              <div className='line'></div>
            </li>
            <li className={classes.head_item}>
              <span>
                <PhoneOutlined className={classes.icon} /> +996 772 61 91 05
              </span>
              <div className='line'></div>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default HeadBar;
