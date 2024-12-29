import { AutoComplete, Input, InputRef } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { KeyboardEvent, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api';
import { useAppDispatch } from '../../store/hook';
import { setSearchedApartments } from '../../store/reducers/apartmentSlices';
import Spinner from '../Spinner/Spinner';
import classes from './Search.module.scss';
import { SearchOutlined } from '@ant-design/icons';

let timeoutId: NodeJS.Timeout | undefined = undefined;

const Search = () => {
  const [options, setOptions] = useState<DefaultOptionType[]>();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<InputRef>(null); // Референс для Input

  const [searchParams] = useSearchParams();
  const categoriesTerm = searchParams.get('categories');
  const citiesTerm = searchParams.get('cities');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSearch = (value: string) => {
    setLoading(true);
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      try {
        const response = await api.flexSearch(value.length ? value.split(' ').filter((str) => Boolean(str)) : ['']);
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
      navigate(
        `/apartments/list?search=${(event.target as HTMLInputElement).value}&categories=${
          categoriesTerm || ''
        }&cities=${citiesTerm || ''}`
      );
    }
  };  

  const onSelect = (value: string, option: DefaultOptionType) => {
    navigate(`/apartments/${option.key}`);
  };
  const handleSearchClick = () => {
    const searchValue = inputRef.current?.input?.value || ''; // Получаем значение из рефа
    setOptions([]); // Закрываем список автокомплита
    navigate(
      `/apartments/list?search=${searchValue}&categories=${categoriesTerm || ''}&cities=${citiesTerm || ''}`
    );
  };
  return (
    <AutoComplete
      style={{ width: '100%' }}
      onSearch={onSearch}
      options={loading ? [{ value: 'loading', label: <Spinner /> }] : options}
      onSelect={onSelect}
    >
      <Input.Search
        size='large'
        ref={inputRef} // Привязываем ссылку к Input
        onKeyDown={onKeyPress}
        className={classes.search}
        enterButton={<SearchOutlined onClick={handleSearchClick} />}
        placeholder='Напишите город/адрес или название апартаментов'
      />
    </AutoComplete>
  );
};

export default Search;
