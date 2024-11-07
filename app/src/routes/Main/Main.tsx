import { Outlet } from 'react-router-dom';
import { Footer, HeadBar } from '../../Components';

const Main = () => {
  return (
    <>
      <HeadBar />

      <Outlet />

      <Footer />
    </>
  );
};

export default Main;
