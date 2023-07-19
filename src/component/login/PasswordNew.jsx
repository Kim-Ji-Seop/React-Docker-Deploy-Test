import React, { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import style from "./PasswordNew.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function PasswordNew() {
  const location = useLocation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);
  const [isEquals, setIsEquals] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [isBlank, setIsBlank] = useState(false)


  const handleInputPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleInputCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const moveLoginHandler = async () => {
    //비밀번호 재설정 빈칸 유뮤
    if(newPassword.trim() === "" || checkPassword.trim() === ""){
      console.log('1')
      setIsBlank(true)
      return
    }else{
      console.log('2')

      setIsBlank(false)
    }
    //비밀번호 재설정 문자가 일치한지
    if(newPassword !== checkPassword) {
      console.log('3')

      setIsEquals(false)
      return
    }else{
      console.log('4')

      setIsEquals(true)
    }
    //정규식 처리
    const pattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
    const isValid = pattern.test(newPassword);
    if(!isValid){
      console.log(newPassword)
      console.log('5')

      setPasswordValid(false)
      return
    }else{
      console.log('6')

      setPasswordValid(true)
    }
    // "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWR4Ijo3LCJpYXQiOjE2ODkyNjgzMzAsImV4cCI6MTY5MDczOTU1OX0.H35F2qY4p3D3QVaG4ZgPJkaqRSoPCPQ_kX2Inj8420E"
    const requestBody = {
      pw : newPassword,
      pwCheck : checkPassword
    }

    //비밀번호 재설정 api 호출
    try {
      console.log('7')

      const response = await fetch(
        "https://www.insung.shop/jat/sellers/pw-restore",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": location.state.jwt
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      if (!data["isSuccess"]) {
        console.log(data["message"]);
        return;
      }
      const passwordSettingSuccess = data["result"];
      console.log(passwordSettingSuccess);
      console.log('8')

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className={style.PasswordNew}>
        <span className={style.title}>새로운 비밀번호를 입력해주세요</span>
        <form action="" className={style.PASSWORD_NEW}>
          <label htmlFor="">새 비밀번호</label>
          <p>영문+숫자 10자 이상 또는 영문+숫자+특수기호 8자 이상</p>
          <input
            type="text"
            placeholder="새 비밀번호 입력"
            className={style.newpassword}
            onChange={handleInputPassword}
          />
          {isBlank && <p>빈 칸입니다.</p>}
          {!passwordValid && <p>영문+숫자 10자 이상 또는 영문+숫자+특수기호 8자 이상</p>}
          <label htmlFor="">새 비밀번호 확인</label>
          <input
            type="text"
            placeholder="새 비밀번호 재입력"
            onChange={handleInputCheckPassword}
          />
          {!isEquals && <p>비밀번호가 일치하지 않습니다.</p>}
        </form>
        <button className={style.bluebutton} onClick={moveLoginHandler}>
          로그인
        </button>
      </div>
      <Footer />
    </div>
  );
}
