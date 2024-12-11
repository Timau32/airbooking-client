import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import colors from './scss/variables/colors.module.scss';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core'; // Библиотека для добавления иконок
import { fab } from '@fortawesome/free-brands-svg-icons'; // Все иконки из пакета brands
import { far } from '@fortawesome/free-regular-svg-icons'; // Все иконки из пакета regular
import { fas } from '@fortawesome/free-solid-svg-icons'; // Все иконки из пакета solid

// Добавление иконок в библиотеку
library.add(fas, far, fab); // Добавляем все иконки из каждого пакета

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary100,
          colorBgTextActive: colors.hover100,
          colorBgTextHover: colors.hover100,
          colorFillAlter: colors.hover100,
          // colorBgElevated: colors.verylightgrey,
          colorBgLayout: colors.verylightgrey,
        },
        components: {
          Tabs: {
            colorBgContainer: '#fff',
            colorBgTextActive: colors.verylightgrey,
            colorBgTextHover: colors.verylightgrey,
            colorFillAlter: colors.verylightgrey,
          },

          // Input: {
          //   inputFontSizeLG: 17,
          // },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
  /* </React.StrictMode> */
);
