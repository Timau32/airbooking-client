import { AutoComplete, Input, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { KeyboardEvent, useRef, useState } from 'react';
import api from '../../api';
import classes from './Search.module.scss';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hook';
import { setSearchedApartments } from '../../store/reducers/apartmentSlices';

let timeoutId: NodeJS.Timeout | undefined = undefined;

const Search = () => {
  const [options, setOptions] = useState<DefaultOptionType[]>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSearch = (value: string) => {
    setLoading(true);
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      try {
        const response = await api.flexSearch(value.split(' '));
        setOptions(response.data.map(({ slug, title }) => ({ value: title, key: slug })));
        dispatch(setSearchedApartments(response.data));
      } catch (err) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      navigate(`/apartments/list?search=${(event.target as HTMLInputElement).value}`);
    }
  };

  return (
    <AutoComplete
      style={{ width: '100%' }}
      onSearch={onSearch}
      options={loading ? [{ value: 'loading', label: <Spinner /> }] : options}
    >
      <Input.Search
        size='large'
        onKeyDown={onKeyPress}
        className={classes.search}
        placeholder='Напишите город/адрес или название апартаментов'
      />
    </AutoComplete>
  );
};

export default Search;
