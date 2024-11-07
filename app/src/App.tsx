import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import Main from './routes/Main/Main';
import Support from './routes/Support/Support';
import './scss/app.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route element={<Home />} path='/' />
          <Route element={<Support />} path='/support' />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
