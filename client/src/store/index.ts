// third-party
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const persistConfig = {
	key: "root",
	storage,//localStorage에 저장합니다.
	whitelist: ["cards"],// menu, cards, required 3개의 reducer 중에 cards reducer만 localstorage에 저장합니다.
};
  
const persistedReducer = persistReducer(persistConfig, reducers);
  
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});
  
const { dispatch } = store;

export { store, dispatch };
