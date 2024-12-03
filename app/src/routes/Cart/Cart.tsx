import React, { useEffect, useState } from 'react';
import api from '../../api';
import { message } from 'antd';
import { pushUps } from '../../helpers/pushUps';

const Cart = () => {
  const [isLaoding, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const response = await api.getFavorites();
      console.log(response);
    } catch (Err) {
      console.log(Err);
      message.error(pushUps.DEFAULT_FETCH_ERROR)
    } finally {
      setIsLoading(false)
    }
  };

  return <div>Cart</div>;
};

export default Cart;
