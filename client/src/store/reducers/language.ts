// Redux Toolkit에서 제공하는 createSlice 함수를 import합니다.
import { createSlice } from '@reduxjs/toolkit';

// 초기 상태를 정의합니다.
const initialState = {
    selected_language: 'en'
};

// ==============================|| SLICE - MENU ||============================== //

// 'lanuguage' 슬라이스를 생성합니다.
const language = createSlice({
    name: 'language', // 슬라이스의 이름을 지정합니다.
    initialState, // 초기 상태를 지정합니다.
    reducers: {
        // 상태를 업데이트하는 리듀서 함수를 정의합니다.
        // 현재 활성화된 아이템을 설정하는 리듀서입니다.
        setLanguage(state, action) {
            // console.log("call setLanguage :", action);
            state.selected_language = action.payload.language;
        },
    },
});

// 생성된 리듀서를 기본으로 export 합니다.
export default language.reducer;

// 각각의 리듀서 함수들을 export 합니다.
export const { setLanguage } = language.actions;
