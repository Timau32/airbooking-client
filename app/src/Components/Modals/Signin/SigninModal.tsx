import { Divider, Form, Input, message, Modal, Typography } from 'antd';
import axios, { AxiosError } from 'axios';
import api from '../../../api';
import classes from '../Modals.module.scss';
import { useState } from 'react';

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

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await api.signIn(values);
      console.log(response);
      onCancel();
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
