import { Col, Divider, Form, Input, message, Modal, Row, Typography } from 'antd';
import classes from '../Modals.module.scss';
import { useState } from 'react';
import api from '../../../api';

type Props = {
  onCancel: () => void;
  onSigninOpen: () => void;
  isOpen: boolean;
};

type FormValues = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
};

const SignupModal = ({ onCancel, isOpen, onSigninOpen }: Props) => {
  const [form] = Form.useForm<FormValues>();
  const [isDisable, setIsDisable] = useState(true);
  const [isLaoding, setIsLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const { confirm, ...personalData } = values;
      const formData = new FormData();

      for (const key in personalData) {
        formData.append(key, personalData[key as keyof typeof personalData]);
      }

      formData.append('username', `${Date.now()}`);
      const response = await api.signUp(formData);
      onCancel();
      onSigninOpen();

      message.success('Ваш аккаунт успешно создано');
    } catch (err) {
      message.error('Не получается зарегистрироваться');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onNavigate = () => {
    onCancel();
    onSigninOpen();
  };

  const onChangeForm = () => {
    const { confirm, password, email, first_name, last_name, phone } = form.getFieldsValue();

    const isAbleToSignup = password === confirm && confirm && password && first_name && last_name && (email || phone);
    if (!!form.getFieldsError().filter(({ errors }) => errors.length).length || !Boolean(isAbleToSignup)) {
      setIsDisable(true);
      return;
    }

    setIsDisable(false);
  };

  return (
    <Modal
      onCancel={onCancel}
      open={isOpen}
      onOk={form.submit}
      className={classes.signup}
      classNames={{ body: classes.signup_body }}
      title='Регистрация'
      centered
      okButtonProps={{
        disabled: isDisable,
      }}
      confirmLoading={isLaoding}
    >
      <Form onChange={onChangeForm} className={classes.signin_form} form={form} layout='vertical' onFinish={onFinish}>
        <Row justify={'space-between'}>
          <Col span={11}>
            <Form.Item required label='Имя' name={'first_name'}>
              <Input placeholder='Введите Имя' />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item required label='Фамилия' name={'last_name'}>
              <Input placeholder='Введите Фамилию' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label='Телефонный номер' name={'phone'}>
          <Input placeholder='Введите телефонный номер' />
        </Form.Item>

        <Form.Item label='Email' name={'email'}>
          <Input placeholder='Введите Email' />
        </Form.Item>

        <Form.Item required label='Пароль' name={'password'}>
          <Input.Password placeholder='Введите пароль' />
        </Form.Item>
        <Form.Item
          required
          rules={[
            { required: true, message: 'Пожалуйста подтвердите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
          label='Подтвердите пароль'
          name={'confirm'}
        >
          <Input.Password placeholder='Введите пароль' />
        </Form.Item>
        <Divider />
        <Typography.Paragraph>
          Если у вас есть аккаунта то <Typography.Link onClick={onNavigate}>ввойдите в аккаунт</Typography.Link>{' '}
        </Typography.Paragraph>
      </Form>
    </Modal>
  );
};

export default SignupModal;
