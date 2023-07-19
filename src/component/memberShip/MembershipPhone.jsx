import React, { useCallback, useEffect, useState } from "react";
import style from "./MembershipPhone.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_AGREEMENT } from "../../store/membership";

export default function MembershipPhone() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const membership = useSelector((state) => state.membership.value);
  const [userInfo, setUserInfo] = useState({
    agreements: membership.agreements,
    name: "",
    birthday: "",
    phone: "",
  });
  const [checkPhone, setCheckPhone] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180); // 초기 제한 시간을 3분(180초)으로 설정
  const [isValid, setIsValid] = useState({
    name: true,
    birthday: true,
    phone: true,
  });
  const [isClicked, setIsClicked] = useState({
    name: false,
    birthday: false,
    phone: false,
  });

  const changeNameHandler = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const changeBirthdayHandler = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      birthday: e.target.value,
    }));
  };
  const changePhoneHandler = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      phone: e.target.value,
    }));
  };

  const changeCheckPhoneHandler = (e) => {
    setCheckPhone(e.target.value);
  };

  const sendNumberHandler = async (e) => {
    e.preventDefault();
    if (
      userInfo.phone.trim() === "" ||
      userInfo.name.trim() === "" ||
      userInfo.birthday.trim() === ""
    ) {
      alert("입력칸을 다 채워주세요.");
      return;
    }
    if (!isValid.phone || !isValid.name || !isValid.birthday) {
      return;
    }
    //인증번호 전송 API
    try {
      const requestBody = {
        name: userInfo.name,
        birth: userInfo.birthday,
        phoneNum: userInfo.phone,
      };
      const response = await fetch(
        "https://www.insung.shop/jat/sellers/authy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = response.json();
      const result = data["result"];
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    setIsCheck(true);
    setRemainingTime(180); // 인증 시간 초기화
    console.log(userInfo);
  };

  const validateBirthday = useCallback(() => {
    const isValidFormat = /^\d{4}\.\d{2}\.\d{2}$/.test(userInfo.birthday);
    setIsValid((prev) => ({
      ...prev,
      birthday: isValidFormat,
    }));
    setIsClicked((prev) => ({
      ...prev,
      birthday: true,
    }));
  }, [userInfo.birthday]);

  const validateName = useCallback(() => {
    if (userInfo.name === "") {
      setIsValid((prev) => ({
        ...prev,
        name: false,
      }));
    } else {
      setIsValid((prev) => ({
        ...prev,
        name: true,
      }));
    }
    setIsClicked((prev) => ({
      ...prev,
      name: true,
    }));
  }, [userInfo.name]);

  const validatePhone = useCallback(() => {
    const isValidFormat = /^\d{3}\d{4}\d{4}$/.test(userInfo.phone);
    setIsValid((prev) => ({
      ...prev,
      phone: isValidFormat,
    }));
    setIsClicked((prev) => ({
      ...prev,
      phone: true,
    }));
  }, [userInfo.phone]);

  useEffect(() => {
    if (isClicked.birthday) {
      validateBirthday();
    }
  }, [userInfo.birthday, isClicked.birthday, validateBirthday]);

  useEffect(() => {
    if (isClicked.name) {
      validateName();
    }
  }, [userInfo.name, isClicked.name, validateName]);

  useEffect(() => {
    if (isClicked.phone) {
      validatePhone();
    }
  }, [userInfo.phone, isClicked.phone, validatePhone]);

  useEffect(() => {
    if (isCheck) {
      if (remainingTime >= 0) {
        const timer = setTimeout(() => {
          setRemainingTime((prevTime) => prevTime - 1); // 1초씩 감소
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        alert("인증 시간이 만료되었습니다. 인증을 다시 진행해주세요.");
        setIsCheck(false);
      }
    }
  }, [remainingTime, isCheck]);

  const handleResendNumber = () => {
    setIsCheck(false);
    setRemainingTime(180); // 인증 시간 초기화
  };

  const moveLastSignUpHandler = async () => {
    if (remainingTime >= 0) {
      //input에 따른 예외처리
      if (
        userInfo.phone.trim() === "" ||
        userInfo.name.trim() === "" ||
        userInfo.birthday.trim() === ""
      ) {
        alert("입력칸을 다 채워주세요.");
        return;
      }
      if (!isValid.phone || !isValid.name || !isValid.birthday) {
        return;
      }
      if (!isCheck) {
        alert("인증번호를 전송을 먼저 해주세요.");
        return;
      }
      if (checkPhone.trim() === "") {
        alert("인증번호를 입력해주세요.");
        return;
      }
      //인증번호 확인 api호출
      try {
        const requestBody = {
          name: userInfo.name,
          birth: userInfo.birthday,
          phoneNum: userInfo.phone,
          certificationNum: checkPhone,
        };
        console.log(requestBody)
        const response = await fetch(
          "https://www.insung.shop/jat/sellers/authy-pass",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        console.log(data)
        if (!data["isSuccess"]) {
          console.log(data["code"]);
          console.log(data["message"]);
          return;
        }
        const result = data["result"];
        console.log(result);
        if (result["validIdentify"] === 1) {
          dispatch(
            SET_AGREEMENT({
              agreements: userInfo.agreements,
              uid: userInfo.uid,
              name: userInfo.name,
              birthday: userInfo.birthday,
              phone: userInfo.phone,
              password: userInfo.password,
              email: userInfo.email,
            })
          );
          navigate("/signup/begin");
        } else {
          //인증번호 실패
          alert("인증번호가 일치하지 않습니다.");
          setIsCheck(false);
          setRemainingTime(180); // 인증 시간 초기화
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("인증번호 입력 시간 만료");
      setIsCheck(false);
      setRemainingTime(180); // 인증 시간 초기화
    }
  };

  return (
    <div className={style.container}>
      <Header login="login" />
      <div className={style.Search}>
        <span className={style.title}>
          회원 정보를 입력 후, 가입을 완료해주세요.
        </span>
        <form action="" className={style.SIGNUP_PHONE}>
          <label htmlFor="">이름</label>
          <input
            type="text"
            placeholder="이름 입력"
            className={style.name}
            onChange={changeNameHandler}
            onBlur={validateName}
            value={userInfo.name || ""}
          />
          {!isValid.name && isClicked.name && (
            <p style={{ color: "red" }}>이름을 확인해주세요.</p>
          )}
          <label htmlFor="">생년월일</label>
          <input
            type="text"
            placeholder="1998.05.04"
            className={style.phone}
            onChange={changeBirthdayHandler}
            onBlur={validateBirthday}
            value={userInfo.birthday || ""}
          />
          {!isValid.birthday && isClicked.birthday && (
            <p style={{ color: "red" }}>
              올바른 형식(YYYY.MM.DD)으로 입력해주세요.
            </p>
          )}
          <label htmlFor="">휴대폰 번호</label>
          <div className={`${style.inputContainer} ${style.phoneContainer}`}>
            <input
              type="text"
              placeholder="01012345678"
              className={style.certification}
              onChange={changePhoneHandler}
              onBlur={validatePhone}
              value={userInfo.phone || ""}
            />
            {!isCheck && (
              <button className={style.phoneBtn} onClick={sendNumberHandler}>
                인증번호 받기
              </button>
            )}
            {isCheck && (
              <button
                className={style.phoneBtn}
                onClick={handleResendNumber}
                disabled={remainingTime <= 0}
              >
                재전송하기
              </button>
            )}
          </div>
          {!isValid.phone && isClicked.phone && (
            <p style={{ color: "red" }}>
              올바른 형식(01012341234)으로 입력해주세요.
            </p>
          )}
          <label htmlFor="">인증번호</label>
          <div className={style.inputContainer}>
            <input
              type="text"
              placeholder="인증번호 입력"
              className={style.certification}
              onChange={changeCheckPhoneHandler}
            />
            {isCheck && (
              <span className={style.remainingTime}>
                {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초
              </span>
            )}
          </div>
          <p className={style.phoneretry}>
            인증번호 전송은 통신사에 따라 최대 1분까지 소요할 수 있습니다.
            인증번호가 도착하지 않으면 <strong>인증번호 재전송</strong>을
            눌러주세요.
          </p>
        </form>

        <button className={style.bluebutton} onClick={moveLastSignUpHandler}>
          다음
        </button>
      </div>
      <Footer />
    </div>
  );
}
