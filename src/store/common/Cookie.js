import { Cookies } from 'react-cookie';


// setToken : Token를 Cookie에 저장하기 위한 함수
// getCookieToken : Cookie에 저장된 Token 값을 갖고 오기 위한 함수
// removeCookieToken : Cookie 삭제를 위한 함수. 로그아웃 시 사용

//추후에는 refreshToken을 쿠키에 저장하고 리듀서에 accesss Token을 저장하도록 교체
const cookies = new Cookies();

export const setToken = (jwt) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    return cookies.set('jwt', jwt, { 
        sameSite: 'strict', 
        path: "/", 
        expires: new Date(expireDate)
    });
};

export const getCookieToken = () => {
    return cookies.get('jwt');
};

export const removeCookieToken = () => {
    return cookies.remove('jwt', { sameSite: 'strict', path: "/" })
}

// export const setJoinUser = (joinUser) => {
//     const today = new Date();
//     const expireDate = new Date(today.getTime() + 10 * 60 * 1000); // 현재 시간에서 10분(밀리초 단위)을 더한 시간 설정

//     return cookies.set('joinUser', joinUser, { 
//         sameSite: 'strict', 
//         path: "/", 
//         expires: expireDate // 만료일자를 설정한 시간으로 변경
//     });
// };


// export const getJoinUser = () => {
//     return cookies.get('jwt');
// };

// export const removeJoinUser = () => {
//     return cookies.remove('joinUser', { sameSite: 'strict', path: "/" })
// }