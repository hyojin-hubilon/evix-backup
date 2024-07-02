// Redux Toolkit에서 제공하는 createSlice 함수를 import합니다.
import { createSlice } from '@reduxjs/toolkit';

// 초기 상태를 정의합니다.
const initialState = {
    openItem: ['dashboard'], // 현재 열려 있는 아이템을 나타내는 상태입니다.
    defaultId: 'dashboard', // 기본 아이템 ID를 나타내는 상태입니다.
    openComponent: 'buttons', // 현재 열려 있는 컴포넌트를 나타내는 상태입니다.
    drawerOpen: false, // 사이드바(drawer)가 열려 있는지 여부를 나타내는 상태입니다.
    componentDrawerOpen: true, // 컴포넌트 사이드바가 열려 있는지 여부를 나타내는 상태입니다.
};

// ==============================|| SLICE - MENU ||============================== //

// 'menu' 슬라이스를 생성합니다.
const menu = createSlice({
    name: 'menu', // 슬라이스의 이름을 지정합니다.
    initialState, // 초기 상태를 지정합니다.
    reducers: {
        // 상태를 업데이트하는 리듀서 함수를 정의합니다.
        // 현재 활성화된 아이템을 설정하는 리듀서입니다.
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        // 현재 활성화된 컴포넌트를 설정하는 리듀서입니다.
        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        // 사이드바의 열림 상태를 설정하는 리듀서입니다.
        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        // 컴포넌트 사이드바의 열림 상태를 설정하는 리듀서입니다.
        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        },
    },
});

// 생성된 리듀서를 기본으로 export 합니다.
export default menu.reducer;

// 각각의 리듀서 함수들을 export 합니다.
export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = menu.actions;
