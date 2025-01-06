import { Fragment, MouseEvent, useMemo, useState } from 'react';
import { Button, Collapse, Divider, Flex, List, Typography } from 'antd';
import { IApartment } from '../../interfaces';
import classes from './GroupList.module.scss';
import { useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';

type Props = {
  items: IApartment[];
};

const GroupList = ({ items }: Props) => {
  const [filters, setFilters] = useState({
    guest: {
      count: 0,
      title: 'Количество гостей от:',
      short: 'Гости',
    },
    bed: {
      count: 0,
      title: 'Количество кроватей от:',
      short: 'Кровати',
    },
    bathroom: {
      count: 0,
      title: 'Количество ванных комнат от:',
      short: 'Ванные комнаты',
    },
    room: {
      count: 0,
      title: 'Количество комнат от:',
      short: 'Комнаты',
    },
  });

  const navigate = useNavigate();
  const onNavigateToItem = (slug: string) => navigate(`/apartments/${slug}`);
  const filterKeys = useMemo(() => Object.keys(filters), []);

  const onFilterChange = (type: string, count: number) => {
    const key = type as keyof typeof filters;
    const result = filters[key].count + count;

    setFilters((prev) => ({
      ...prev,
      [key]: { ...prev[key], count: result === 0 ? 0 : result },
    }));
  };

  const filteredItems = useMemo(
    () =>
      items.filter(
        ({ bed_count, bathroom_count, room_count, max_guests }) =>
          filters.bathroom.count <= bathroom_count &&
          filters.bed.count <= bed_count &&
          filters.guest.count <= max_guests &&
          filters.room.count <= room_count
      ),
    [filters]
  );

  return (
    <div className={classes.groupList}>
      <List
        itemLayout='vertical'
        size='large'
        header={
          <div className={classes.title}>
            <Typography.Title level={4}>Доступные номера</Typography.Title>
            <Collapse
              items={[
                {
                  label: (
                    <span>
                      Включить фильтры. Включенные фильтры:{' '}
                      {filterKeys.map(
                        (key) =>
                          `${filters[key as keyof typeof filters].short} - ${
                            filters[key as keyof typeof filters].count
                          } `
                      )}{' '}
                    </span>
                  ),
                  key: 'filters',
                  children: filterKeys.map((key) => {
                    const onPlus = () => onFilterChange(key, 1);
                    const onMinus = () => onFilterChange(key, -1);

                    return (
                      <Flex justify='space-between' style={{ marginBottom: '5px' }} key={key}>
                        <b>{filters[key as keyof typeof filters].title}</b>{' '}
                        <Flex justify='space-between' align='center' style={{ userSelect: 'none', gap: '5px' }}>
                          <MinusCircleOutlined
                            className={classes.minus}
                            onClick={onMinus}
                            data-filter={key}
                            data-count='-1'
                          />
                          <div style={{ width: '20px', textAlign: 'center' }}>
                            {filters[key as keyof typeof filters].count}
                          </div>
                          <PlusCircleOutlined
                            className={classes.plus}
                            onClick={onPlus}
                            data-filter={key}
                            data-count='1'
                          />
                        </Flex>
                      </Flex>
                    );
                  }),
                },
              ]}
            />
          </div>
        }
        footer={
          <div style={{ textAlign: 'right' }}>
            <b>Общее количество по результату:</b> {items.length}
          </div>
        }
        pagination={{
          pageSize: 5,
        }}
        dataSource={filteredItems}
        renderItem={(item, index) => (
          <List.Item
            style={{ width: '100%' }}
            key={item.slug}
            extra={<img alt='logo' className={classes.img_item} src={item.images[0].image} />}
          >
            <Typography.Title level={4} className={classes.link} onClick={() => onNavigateToItem(item.slug)}>
              {item.title}
            </Typography.Title>
            {item.amenities.length ? (
              <>
                <Typography.Paragraph>
                  {item?.room_count} комнат <Divider type='vertical' style={{ borderWidth: 2 }} />
                  {item?.max_guests} гостей <Divider type='vertical' style={{ borderWidth: 2 }} />
                  {item?.bathroom_count} ванная <Divider type='vertical' style={{ borderWidth: 2 }} />
                  {item?.bed_count} кровати
                </Typography.Paragraph>
              </>
            ) : null}
            <Typography.Paragraph>
              <b>Цена:</b> {item.price} сом
            </Typography.Paragraph>
          </List.Item>
        )}
      />
    </div>
  );
};

export default GroupList;
