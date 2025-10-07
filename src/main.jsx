import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";
import overrides from "../src/theme/theme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";

let extendedOverrides = { ...overrides };

const theme = extendTheme(
  extendedOverrides,
  withDefaultColorScheme({ colorScheme: "primary" })
);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          {/* <MainLayout>
          </MainLayout> */}
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
