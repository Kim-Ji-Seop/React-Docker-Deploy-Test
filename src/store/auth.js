import { createSlice } from "@reduxjs/toolkit";

// authenticated : 현재 로그인 여부를 간단히 확인하기 위해 선언
// accessToken : Token 저장
// expireTime : Token 의 만료 시간
// SET_TOKEN : Token 정보를 저장
// DELETE_TOKEN : 값을 모두 초기화함으로써 Token에 대한 정보도 삭제
// name : 유저의 성명
// storeName : 가게 이름
// firstLogin : 최초 로그인 여부 (가게 등록 여부) -> 1:가게 등록 X, 0: 가게 등록 O
// menuRegister : 메뉴 등록 여부 -> 1:메뉴 등록 X, 0: 메뉴 등록 O


const initialStateValue = {
    authenticated: false,
    accessToken: null,
    expireTime: null,
    name: "",
    storeName: "",
    firstLogin: 1,
    menuRegister: 1,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: { value: initialStateValue},
    reducers: {
        SET_AUTH: (state, action) => {
            state.value = action.payload;
        },
        DELETE_AUTH: (state) => {
            state.value = initialStateValue;
        },
    },
});

export const TOKEN_TIME_OUT = 600 * 1000;
export const { SET_AUTH, DELETE_AUTH } = authSlice.actions;
export default authSlice.reducer;
