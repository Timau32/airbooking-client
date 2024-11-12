import { Divider, Form, Input, Modal, Typography } from 'antd';
import classes from '../Modals.module.scss';

type Props = {
  onCancel: () => void;
  onSigninOpen: () => void;
  isOpen: boolean;
};

type FormValues = {
  full_name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
};

const SignupModal = ({ onCancel, isOpen, onSigninOpen }: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    onCancel();
  };

  const onNavigate = () => {
    onCancel();
    onSigninOpen();
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
    >
      <Form className={classes.signin_form} form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item required label='ФИО' name={'full_name'}>
          <Input placeholder='Введите ФИО' />
        </Form.Item>
        <Form.Item label='Телефонный номер' name={'phone'}>
          <Input placeholder='Введите телефонный номер' />
        </Form.Item>

        <Form.Item label='Email' name={'email'}>
          <Input placeholder='Введите Email' />
        </Form.Item>

        <Form.Item required label='Пароль' name={'password'}>
          <Input.Password placeholder='Введите пароль' />
        </Form.Item>
        <Form.Item required label='Подтвердите пароль' name={'confirm'}>
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
