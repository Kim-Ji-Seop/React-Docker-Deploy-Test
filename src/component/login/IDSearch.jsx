import React, { useState } from "react";
import style from "./IDSearch.module.css";
import IDSearchPhone from "./IDSearchPhone";
import { useNavigate } from "react-router-dom";

export default function IDSearch() {
  const navigate = useNavigate();
  
  const [button, setButton] = useState(false);
  const [inputName, setInputName] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [inputPhone, setInputPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [phoneValidPattern, setPhoneValidPattern] = useState(true);
  const [validCheck, setValidCheck] = useState(true);
  const [resultPhoneNum, setResultPhoneNum] = useState();
  const handleButton = async () => {
    //인증번호 받기 위한 로직
    if (!button) {
      if (inputName.trim() === "" && inputPhone.trim() === "") {
        setValidCheck(false);
        return;
      } else {
        setValidCheck(true);
      }
      if (inputName.trim() === "") {
        setNameValid(false);
        return;
      } else {
        setNameValid(true);
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
        name: inputName,
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
        const idSearchSuccess = data["result"]["smsIdx"];
        console.log(idSearchSuccess);
        setButton(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      //인증번호 입력후의 로직
      const requestBody = {
        phoneNum: inputPhone,
        name: inputName,
        certificationNum: resultPhoneNum,
      };

      try {
        const response = await fetch(
          "https://www.insung.shop/jat/sellers/id-find",
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
          console.log('')
          return;
        }
        const idSearchSuccess = data["result"];
        navigate("/help/complete", {
          state: { uid: idSearchSuccess[0]["uid"], signUpDate: idSearchSuccess[0]["signUpDate"] },
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
    setInputName(e.target.value);
  };

  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);
  };

  const resultPhoneNumHandler = (num) => {
    setResultPhoneNum(num);
  };

  return (
    <>
      <form action="" className={style.ID_SEARCH}>
        <label htmlFor="">이름</label>
        <input
          type="text"
          placeholder="이름 입력"
          className={style.name}
          onChange={handleInputId}
        />
        {!nameValid && <p>이름을 확인해주세요</p>}
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
      {button && nameValid && phoneValid && validCheck && (
        <IDSearchPhone
          remainHandler={phoneRemainingTimeHandler}
          resultPhoneNumHandler={resultPhoneNumHandler}
        />
      )}
      <BTN
        onClick={handleButton}
        value={button}
      />
    </>
  );
}

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
          아이디 찾기
        </button>
      )}
    </>
  );
}
