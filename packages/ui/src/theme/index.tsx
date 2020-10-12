import React from 'react';
import Theme from './Theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import light from './light';

const ThemeProvider: React.FC = ({ children }) => (
  <StyledThemeProvider theme={light}>{children}</StyledThemeProvider>
);

export { Theme, ThemeProvider, light };
