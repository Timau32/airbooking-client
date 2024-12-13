import { Fragment, ReactNode, useEffect, useState } from 'react';
import api from '../../api';
import { Divider, List, message, Space, Typography } from 'antd';
import { pushUps } from '../../helpers';
import { Container } from '../../Components';
import { IFavorites } from '../../interfaces';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import classes from './Cart.module.scss';
import { useNavigate } from 'react-router-dom';

const IconText = ({ icon, text, onClick }: { icon: ReactNode; text: string; onClick: () => void }) => (
  <Space className={classes.like} onClick={onClick}>
    {icon}
    {text}
  </Space>
);

const Cart = () => {
  const [isLaoding, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<(IFavorites & { image: string; loading: boolean })[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataSource.length) {
      fetchFavorites();
    }
  }, []);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const response = await api.getFavorites();
      console.log(response);

      setDataSource(
        response.data.map((fav) => ({
          ...fav,
          image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
          loading: false,
        }))
      );
    } catch (Err) {
      message.error(pushUps.DEFAULT_FETCH_ERROR);
      console.log(Err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFromFavorites = async (slug: string, index: number) => {
    setDataSource(dataSource.map((data, idx) => ({ ...data, loading: idx === index })));
    await api.removeFavorite(slug);
    setDataSource(dataSource.filter((data) => data.property.slug !== slug));
    message.success('Элемент убран из избранных');
  };

  const onNavigateToItem = (slug: string) => {
    navigate(`/apartments/${slug}`);
  };

  return (
    <section className={classes.cart}>
      <Container>
        <Typography.Title level={2} className={classes.title}>
          Избранные апартаменты
        </Typography.Title>
        <List
          itemLayout='vertical'
          size='large'
          loading={isLaoding}
          header={
            <div style={{ textAlign: 'right' }}>
              <b>Общее количество избранных:</b> {dataSource.length}
            </div>
          }
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={dataSource}
          renderItem={(item, index) => (
            <List.Item
              key={item.user}
              actions={[
                <IconText
                  onClick={() => (item.loading ? null : deleteFromFavorites(item.property.slug, index))}
                  text='Исключить из избранных'
                  icon={item.loading ? <LoadingOutlined /> : <DeleteOutlined />}
                />,
              ]}
              extra={
                <img
                  className={classes.img}
                  alt='logo'
                  src={
                    item.property.images[0]?.image ||
                    'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                  }
                />
              }
            >
              <Typography.Title level={4} className={classes.link} onClick={() => onNavigateToItem(item.property.slug)}>
                {item.property.title}
              </Typography.Title>
              <div dangerouslySetInnerHTML={{ __html: item.property.description }} />
              {item.property.amenities.length ? (
                <>
                  <Typography.Title level={5}>Основные удобства</Typography.Title>
                  <Typography.Paragraph>
                    {item.property.amenities.map((element, idx) => (
                      <Fragment key={element.slug}>
                        {element.name} {item.property.amenities.length - 1 !== idx && <Divider type='vertical' />}
                      </Fragment>
                    ))}
                  </Typography.Paragraph>
                </>
              ) : null}
            </List.Item>
          )}
        />
      </Container>
    </section>
  );
};

export default Cart;
