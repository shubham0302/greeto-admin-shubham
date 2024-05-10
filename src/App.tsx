import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { AlertProvider } from "./common";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import AppConfig from "./AppConfig";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <Provider store={store}>
          <BrowserRouter>
            <AppConfig />
          </BrowserRouter>
        </Provider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
