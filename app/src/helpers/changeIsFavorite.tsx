import { message } from 'antd';
import { getCookie } from './getCookie';
import { IApartment } from '../interfaces';
import api from '../api';

const changeIsFavorite = async (apartment: IApartment) => {
  const token = getCookie('auth-token');
  if (!token) message.warning('Ввойдите в аккаунт чтобы добавить в избранное');
  if (!apartment.is_favorite) {
    const response = await api.setFavorite(apartment.slug);
    message.success('Объект успешно добавлен в избранное');
  } else if (apartment.is_favorite) {
    await api.removeFavorite(apartment.slug);
    message.success('Объект успешно убран из избранных');
  }
};

export default changeIsFavorite
