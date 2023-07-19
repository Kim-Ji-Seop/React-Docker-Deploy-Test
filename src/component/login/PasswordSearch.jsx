import React, { useState } from "react";
import style from "./PasswordSearch.module.css";
import PasswordSearchPhone from "./PasswordSearchPhone";
import { useNavigate } from "react-router-dom";

export default function PasswordSearch() {
  const navigate = useNavigate();

  const [button, setButton] = useState(false);
  const [inputId, setInputId] = useState("");
  const [idValid, setIdValid] = useState(true);
  const [inputPhone, setInputPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [phoneValidPattern, setPhoneValidPattern] = useState(true);
  const [validCheck, setValidCheck] = useState(true);
  const [resultPhoneNum, setResultPhoneNum] = useState();
  const handleButton = async () => {
    //인증번호 받기 위한 로직
    if (!button) {
      if (inputId.trim() === "" && inputPhone.trim() === "") {
        setValidCheck(false);
        return;
      } else {
        setValidCheck(true);
      }
      if (inputId.trim() === "") {
        setIdValid(false);
        return;
      } else {
        setIdValid(true);
      }
      if (inputPhone.trim() === "") {
        setPhoneValid(false);
        return;
      } else {
        setPhoneValid(true);
      }

      const pattern = /^\d{3}\d{4}\d{4}$/;
      const isValid = pattern.test(inputPhone);
      if (!isValid) {
        setPhoneValidPattern(false);
        return;
      }

      const requestBody = {
        phoneNum: inputPhone,
        uid: inputId,
      };

      console.log(requestBody);
      try {
        const response = await fetch(
          "https://www.insung.shop/jat/sellers/lost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        if (!data["isSuccess"]) {
          console.log(data["message"]);
          return;
        }
        const passwordSearchSuccess = data["result"]["smsIdx"];
        console.log(passwordSearchSuccess);
        setButton(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      //인증번호 입력후의 로직
      const requestBody = {
        phoneNum: inputPhone,
        uid: inputId,
        certificationNum: resultPhoneNum,
      };

      try {
        const response = await fetch(
          "https://www.insung.shop/jat/sellers/pw-find",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        if (!data["isSuccess"]) {
          console.log("");
          return;
        }
        const passwordSearchSuccess = data["result"];
        console.log(passwordSearchSuccess);
        if(passwordSearchSuccess["pwRestoreAble"] === 0) {
          alert('비밀번호가 재설정 가능하지 않습니다.')
          setButton(false)
          return
        }
        navigate("/help/new-pw", {
          state: { uid: passwordSearchSuccess["uid"], jwt: passwordSearchSuccess["jwt"] },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const phoneRemainingTimeHandler = () => {
    setButton(false);
  };

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);
  };

  const resultPhoneNumHandler = (num) => {
    setResultPhoneNum(num);
  };

  return (
    <>
      <form action="" className={style.PASSWORD_SEARCH}>
        <label htmlFor="">아이디</label>
        <input
          type="text"
          placeholder="아이디 입력"
          className={style.id}
          onChange={handleInputId}
        />
        {!idValid && <p>이름을 확인해주세요</p>}
        {!validCheck && <p>이름을 확인해주세요</p>}
        <label htmlFor="">휴대폰 번호</label>
        <input
          type="text"
          placeholder="- 없이 휴대폰 번호 입력"
          className={style.phone}
          onChange={handleInputPhone}
        />
        {!phoneValid && <p>전화번호 확인해주세요</p>}
        {!validCheck && <p>전화번호 확인해주세요</p>}
        {!phoneValidPattern && <p>전화번호 확인해주세요</p>}
      </form>
      {button ? (
        <PasswordSearchPhone
          raminHandler={phoneRemainingTimeHandler}
          resultPhoneNumHandler={resultPhoneNumHandler}
        />
      ) : (
        ""
      )}
      <BTN onClick={handleButton} value={button} />
    </>
  );

  function BTN({ value, onClick }) {
    return (
      <>
        {!value && (
          <button className={style.bluebutton} onClick={onClick}>
            인증번호 받기
          </button>
        )}
        {value && (
          <button className={style.bluebutton} onClick={onClick}>
            비밀번호 찾기
          </button>
        )}
      </>
    );
  }
}
