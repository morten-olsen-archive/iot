import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ThemeProvider } from '@morten-olsen/iot-ui';
import Router from './Router';
import { FilesProvider } from './context/FilesContext';
import { ModelsProvider } from './context/ModelsContext';
import { HomesProvider } from './context/HomesContext';

const font = document.createElement('link');
font.rel = 'stylesheet';
font.href =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600&family=Source+Code+Pro&display=swap';
document.head.appendChild(font);

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 100;
  }
  code {
    font-family: 'Source Code Pro', monospace;
  }
  body {
    font-family: 'Montserrat', sans-serif;
  }
  html, body {
    height: 100%;
  }
`;

const i18nInstance = i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    /*
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    */
  });

const App = () => (
  <I18nextProvider i18n={i18nInstance}>
    <ThemeProvider>
      <GlobalStyles />
      <ModelsProvider>
        <FilesProvider>
          <HomesProvider>
            <Router />
          </HomesProvider>
        </FilesProvider>
      </ModelsProvider>
    </ThemeProvider>
  </I18nextProvider>
);

const HotApp = hot(App);

const root = document.getElementById('root') || document.createElement('div');
root.id = 'root';
root.style.width = '100%';
root.style.height = '100%';
document.body.appendChild(root);

ReactDOM.render(<HotApp />, root);
