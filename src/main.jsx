import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import overrides from '../src/theme/theme';
import App from './App'
import { BrowserRouter } from 'react-router-dom';

let extendedOverrides = { ...overrides };

const theme = extendTheme(
  extendedOverrides,
  withDefaultColorScheme({ colorScheme: 'primary' })
);

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)