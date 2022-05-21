import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import AppPages from "./pages";

const App = () => {
    return <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
            <BrowserRouter>
                <AppPages />
            </BrowserRouter>
        </Provider>
    </SnackbarProvider>
}

export default App;
