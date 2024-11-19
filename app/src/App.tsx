import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Cart from './routes/Cart/Cart';
import Home from './routes/Home/Home';
import Main from './routes/Main/Main';
import Support from './routes/Support/Support';
import './scss/app.scss';
import { message } from 'antd';
import { getCookie } from './helpers/getCookie';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route element={<Home />} path='/' />
          <Route element={<Support />} path='/support' />
          <Route
            element={
              <Protected>
                <Cart />
              </Protected>
            }
            path='/cart'
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Protected = ({ children }: any) => {
  const accessToken = getCookie('auth-token');

  if (!accessToken) {
    message.error('Сперва войдите чтобы увидеть избранные апартаменты');
    return <Navigate to='/' />;
  }

  return children;
};

export default App;
