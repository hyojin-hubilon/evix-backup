import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { StrictMode } from "react";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App.tsx";

import { store } from "@/store";


const persistor = persistStore(store);


ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter basename="/">
					<App />
				</BrowserRouter>
			</PersistGate>
        </ReduxProvider>
    </StrictMode>
);
