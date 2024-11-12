import { Form, Typography, Input, Button } from 'antd';
import { Container } from '../../Components';
import classes from './Support.module.scss';
import { useState } from 'react';

const Support = () => {
  const [isLaoding, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  return (
    <section className={classes.section}>
      <Container>
        <Typography.Title>Тех поддержка</Typography.Title>

        <Form className={classes.form} form={form} layout='vertical'>
          <Form.Item required label='ФИО' name={'full_name'}>
            <Input placeholder='Введите ФИО' />
          </Form.Item>
          <Form.Item required label='Телефонный номер или email' name={'data'}>
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
    </section>
  );
};

export default Support;
