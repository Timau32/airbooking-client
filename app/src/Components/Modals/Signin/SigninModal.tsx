import { Divider, Form, Input, message, Modal, Typography } from 'antd';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import api from '../../../api';
import { setCookie } from '../../../helpers/getCookie';
import { useAppDispatch } from '../../../store/hook';
import { setIsLogined } from '../../../store/reducers/apartmentSlices';
import classes from '../Modals.module.scss';

type Props = {
  onCancel: () => void;
  onSingupOpen: () => void;
  isOpen: boolean;
};

type FormValues = {
  identifier: string;
  password: string;
};

const SigninModal = ({ onCancel, isOpen, onSingupOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await api.signIn(values);
      setCookie('auth-token', response.data.access, 1);
      setCookie('refresh', response.data.refresh, 1);
      onCancel();
      message.success('Вы успешно вошли в аккаунт');
      dispatch(setIsLogined(true));
    } catch (err) {
      const errResponse = err as any | AxiosError;
      const isServerError = axios.isAxiosError(err);
      if (isServerError) {
        return message.error(errResponse.response.data.message);
      }
      message.error('У вас плохое интернет соединение. Пожалуйста попробуйте еще раз позже');
      console.log(isServerError);
    } finally {
      setLoading(false);
    }
  };

  const onNavigate = () => {
    onCancel();
    onSingupOpen();
  };

  return (
    <Modal
      className={classes.signup}
      classNames={{ body: classes.signup_body }}
      title='Вход в аккаунт'
      onCancel={onCancel}
      open={isOpen}
      onOk={form.submit}
      confirmLoading={loading}
    >
      <Form className={classes.signin_form} form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item label='Телефонный номер или email' name={'identifier'}>
          <Input placeholder='Введите телефонный номер / email' />
        </Form.Item>

        <Form.Item label='Пароль' name={'password'}>
          <Input.Password placeholder='Введите пароль' />
        </Form.Item>

        <Divider />
        <Typography.Paragraph>
          Если у вас нет аккаунта то <Typography.Link onClick={onNavigate}>Зарегистрируйтесь</Typography.Link>{' '}
        </Typography.Paragraph>
      </Form>
    </Modal>
  );
};

export default SigninModal;
