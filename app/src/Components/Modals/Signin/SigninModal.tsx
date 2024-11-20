import { Divider, Form, Input, Modal, Typography } from 'antd';
import classes from '../Modals.module.scss';

type Props = {
  onCancel: () => void;
  onSingupOpen: () => void;
  isOpen: boolean;
};

type FormValues = {
  login: string;
  password: string;
};

const SigninModal = ({ onCancel, isOpen, onSingupOpen }: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    onCancel();
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
    >
      <Form className={classes.signin_form} form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item label='Телефонный номер или email' name={'login'}>
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
