import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import style from "./IDShow.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function IDShow() {

  const location = useLocation();
  const navigate = useNavigate();

  const moveLoginHandler = () => {
    navigate('/login')
  }

  const moveForgotPasswordHandler = () => {
    navigate('/help')
  }

  return (
    <div className={style.container}>
      <Header />
      <div className={style.IDShow}>
        <span className={style.title}>아이디 - 비밀번호 찾기</span>
        <div className={style.result}>
          <span className={style.result_title}>
            가입한 아이디는 아래와 같습니다
          </span>
          <p className={style.result_desc}>
            인증한 휴대폰 번호로 가입한 아이디입니다. 아이디 확인 후 로그인을
            진행해 주세요.
          </p>
          <span className={style.result_id}>{location.state.uid}</span>
          <p className={style.result_date}>{location.state.signUpDate} 가입</p>
        </div>
        <button className={style.bluebutton} onClick={moveLoginHandler}>로그인하러 가기</button>
        <p className={style.passwordlost} onClick={moveForgotPasswordHandler}>비밀번호를 잊으셨나요?</p>
      </div>
      <Footer />
    </div>
  );
}
