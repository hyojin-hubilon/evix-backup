// third-party
import { combineReducers } from 'redux'; // Redux에서 제공하는 combineReducers 함수를 import 합니다.

// project import
import menu from './menu'; // 우리가 정의한 menu 슬라이스를 import 합니다.
import { cardSlice, requiredSlice } from './survey';

// ==============================|| COMBINE REDUCERS ||============================== //

// 여러 리듀서를 하나로 합칩니다.
// menu, survey card, required
const reducers = combineReducers({ 
	menu,
	cards: cardSlice.reducer,
	required: requiredSlice.reducer,
});
export type IRootState = ReturnType<typeof reducers>;

export default reducers; // 합쳐진 리듀서를 export 합니다.
