import { Input } from 'antd';
import classes from './Search.module.scss';

const Search = () => {
  return (
    <Input.Search
      size='large'
      className={classes.search}
      placeholder='Напишите город/адрес или название апартаментов'
    />
  );
};

export default Search;
