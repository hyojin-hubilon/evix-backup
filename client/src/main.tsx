import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { StrictMode } from "react";

import App from "./App.tsx";

import { store } from "@/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <BrowserRouter basename="/">
                <App />
            </BrowserRouter>
        </ReduxProvider>
    </StrictMode>
);
