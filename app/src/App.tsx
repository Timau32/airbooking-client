import { message } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getCookie } from './helpers/getCookie';
import Cart from './routes/Cart/Cart';
import Home from './routes/Home/Home';
import Main from './routes/Main/Main';
import Support from './routes/Support/Support';
import Apartment from './routes/Apartment/Apartment';
import './scss/app.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route element={<Home />} path='/' />
          <Route element={<Support />} path='/support' />
          <Route element={<Apartment />} path='/apartments/:slug' />
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
