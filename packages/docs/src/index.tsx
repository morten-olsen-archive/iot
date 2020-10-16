import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ThemeProvider } from '@morten-olsen/iot-ui';
import Router from './Router';
import './files';

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
      <Router />
    </ThemeProvider>
  </I18nextProvider>
);

const HotApp = hot(App);

ReactDOM.render(<HotApp />, document.body);
