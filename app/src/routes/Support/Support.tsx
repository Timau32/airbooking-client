import { Form, Typography, Input, Button, message } from 'antd';
import { Container } from '../../Components';
import classes from './Support.module.scss';
import { useState } from 'react';
import api from '../../api';
import LoadingComponents from '../../Components/Spinner/LoadingComponents';

const Support = () => {
  const [isLaoding, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      await api.sendMessageToSupport(values);
      message.success('Вы успешно обратились к тех поддержку, ожидайте с вами свяжутся в ближайщее время', 6);
      form.resetFields();
    } catch (err) {
      message.error('Не получилось отправить сообщения попробуйте позже');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.section}>
      <Container>
        <Typography.Title>Тех поддержка</Typography.Title>

        <Form onFinish={onFinish} className={classes.form} form={form} layout='vertical'>
          <Form.Item required label='ФИО' name={'full_name'}>
            <Input placeholder='Введите ФИО' />
          </Form.Item>
          <Form.Item required label='Телефонный номер или email' name={'contact_info'}>
            <Input placeholder='Введите телефонный номер / email' />
          </Form.Item>

          <Form.Item required label='Сообщение' name={'message'}>
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type='primary'
                htmlType='submit'
                loading={isLaoding}
                disabled={
                  !form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Отправить
              </Button>
            )}
          </Form.Item>
        </Form>
      </Container>

      {isLaoding && <LoadingComponents />}
    </section>
  );
};

export default Support;
