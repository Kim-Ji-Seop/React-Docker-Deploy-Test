import React, { useState } from "react";
import style from "./LoginStart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { SET_AUTH, TOKEN_TIME_OUT } from "../../store/auth";
import { getCookieToken, setToken } from "../../store/common/Cookie";

export default function LoginStart() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.value); //auth 리듀서 값 꺼내기
  const navigate = useNavigate();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  async function onClickLogin() {
    if (inputId.trim() === "" || inputPw.trim() === "") {
      console.log("아이디또는 비밀번호를 입력해주세요.");
      return;
    }

    const requestBody = {
      uid: inputId,
      password: inputPw,
    };

    console.log(requestBody);
    try {const response = await fetch("https://www.insung.shop/jat/sellers/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (!data["isSuccess"]) {
      console.log(data["message"]);
      return;
    }
    const loginSuccess = data["result"];

    setToken(loginSuccess.jwt);
    dispatch(
      SET_AUTH({
        authenticated: true,
        accessToken: loginSuccess.jwt,
        expireTime: new Date().getTime() + TOKEN_TIME_OUT,
        name: loginSuccess.name,
        storeName: loginSuccess["store_name"],
        firstLogin: loginSuccess["first_login"],
        menuRegister: loginSuccess["menu_register"],
      })
    );

    console.log(loginSuccess.jwt);
    console.log(loginSuccess["first_login"]);
    console.log(loginSuccess["menu_register"]);

    console.log(`쿠키 jwt 확인 : ${getCookieToken()}`)
    if ( //최초 회원가입시 가게 정보를 기입해야함
      loginSuccess["first_login"] === 1 &&
      loginSuccess["menu_register"] === 1
    ) {
      return navigate("/register/store");
    } else if ( //관리자가 가게 승인만 하고 메뉴 등록 하지 않을때
      loginSuccess["first_login"] === 0 &&
      loginSuccess["menu_register"] === 1
    ) {
      return navigate("/register/menu");
    } else { //가게 승인과 메뉴 등록을 완료한 뒤 화면 또는 00시 지나고 재고 최신화하기 위함.
      return navigate("/today/menu");
    }}catch(err){
      console.log('서버가 아직 안켜져있습니다.')
      console.log(err)
    }
  }

  return (
    <div className={style.container}>
      <Header />
      <div className={style.LoginStart}>
        <span className={style.title}>로그인</span>
        <form action="" className={style.LOGIN_FORM}>
          <input
            type="text"
            placeholder="아이디"
            className={style.id}
            onChange={handleInputId}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className={style.password}
            onChange={handleInputPw}
          />
        </form>
        <div className={style.login_options}>
          <div className={style.left}>
            <input type="checkbox" className={style.checkbox} />
            <label htmlFor="">아이디 저장</label>
          </div>
          <div className={style.right}>
            <Link to='/help'>아이디 - 비밀번호 찾기</Link>
            <Link to='/signup/agree'>회원가입</Link>
          </div>
        </div>
        <button className={style.bluebutton} onClick={onClickLogin}>
          로그인
        </button>
      </div>
      <Footer />
    </div>
  );
}
