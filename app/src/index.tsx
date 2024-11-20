import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import colors from './scss/variables/colors.module.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
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
  /* </React.StrictMode> */
);
