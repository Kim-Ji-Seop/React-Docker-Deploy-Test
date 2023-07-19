import React, { useCallback, useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import style from "./MembershipInformation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MembershipInformation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const membership = useSelector((state) => state.membership.value);
  console.log("회원가입 마지막 화면");
  console.log(membership.name);
  console.log(membership.birthday);
  console.log(membership.phone);
  const [userInfo, setUserInfo] = useState({
    arguments: membership.agreements,
    name: membership.name,
    birthday: membership.birthday,
    phone: membership.phone,
    uid: membership.uid,
    password: membership.password,
    email: membership.email,
  });
  const [checkPassword, setCheckPassword] = useState("");

  const [isValid, setIsValid] = useState({
    uid: true,
    password: true,
    checkPassword: true,
    email: true,
  });

  const [isClicked, setIsClicked] = useState({
    uid: false,
    password: false,
    checkPassword: false,
    email: false,
  });

  const changeUidHandler = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      uid: e.target.value,
    }));
  };

  const changePasswordHandler = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const changeEmailHandler = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const changeCheckPasswordHandler = (e) => {
    setCheckPassword(e.target.value);
  };

  const validateUid = useCallback(() => {
    const isValidFormat = /^[a-zA-Z0-9]{4,20}$/.test(userInfo.uid);
    setIsValid((prev) => ({
      ...prev,
      uid: isValidFormat,
    }));
    setIsClicked((prev) => ({
      ...prev,
      uid: true,
    }));
  }, [userInfo.uid]);

  const validatePassword = useCallback(() => {
    const isValidFormat =
      /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()-=_+]{8,}|(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()-=_+])[a-zA-Z0-9!@#$%^&*()-=_+]{10,}$/.test(
        userInfo.password
      );
    setIsValid((prev) => ({
      ...prev,
      password: isValidFormat,
    }));
    setIsClicked((prev) => ({
      ...prev,
      password: true,
    }));
  }, [userInfo.password]);

  const validateEmail = useCallback(() => {
    const isValidFormat = /^[a-zA-Z0-9]{4,20}$/.test(userInfo.email);
    setIsValid((prev) => ({
      ...prev,
      email: isValidFormat,
    }));
    setIsClicked((prev) => ({
      ...prev,
      email: true,
    }));
  }, [userInfo.email]);

  const isCheckedPassword = useCallback(() => {
    if (checkPassword !== userInfo.password) {
      setIsValid((prev) => ({
        ...prev,
        checkPassword: false,
      }));
    } else {
      setIsValid((prev) => ({
        ...prev,
        checkPassword: true,
      }));
    }

    setIsClicked((prev) => ({
      ...prev,
      checkPassword: true,
    }));
  }, [userInfo.password, checkPassword]);

  useEffect(() => {
    if (isClicked.uid) {
      validateUid();
    }
  }, [userInfo.uid, isClicked.uid, validateUid]);

  useEffect(() => {
    if (isClicked.password) {
      validatePassword();
    }
  }, [userInfo.password, isClicked.password, validatePassword]);

  useEffect(() => {
    if (isClicked.checkPassword) {
      isCheckedPassword();
    }
  }, [checkPassword, isClicked.checkPassword, isCheckedPassword]);

  const moveCompleteSignUpHandler = () => {
    //중복확인 api
    //dispatch
    //navigate('/login')
  };

  return (
    <div className={style.container}>
      <Header login="login" />
      <div className={style.MembershipInformation}>
        <span className={style.title}>
          회원 정보를 입력 후, 가입을 완료해주세요.
        </span>

        <div className={style.wrap}>
          <div className={style.right}>
            <form action="" className={style.ID}>
              <label htmlFor="">아이디</label>
              <input
                type="text"
                placeholder="영문 혹은 영문+숫자, 4~20자"
                onChange={changeUidHandler}
                onBlur={validateUid}
                value={userInfo.uid || ""}
              />
              {!isValid.uid && isClicked.uid && (
                <p style={{ color: "red" }}>
                  영문 혹은 영문+숫자, 4~20자로 입력해주세요.
                </p>
              )}
            </form>

            <form action="" className={style.PASSWORD}>
              <label htmlFor="">비밀번호</label>
              <label htmlFor="">
                영문+숫자 10자 이상 또는 영문+숫자+특수기호 8자 이상
              </label>
              <input
                type="password"
                placeholder="비밀번호 입력"
                onChange={changePasswordHandler}
                onBlur={validatePassword}
                value={userInfo.password || ""}
              />
              {!isValid.password && isClicked.password && (
                <p style={{ color: "red" }}>
                  영문+숫자 10자 이상 또는 영문+숫자+특수기호 8자 이상으로 입력해주세요.
                </p>
              )}
              <input
                type="password"
                placeholder="비밀번호 재입력"
                onChange={changeCheckPasswordHandler}
                onBlur={isCheckedPassword}
                value={checkPassword || ""}
              />
              {!isValid.checkPassword && isClicked.checkPassword && (
                <p style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </form>

            <form action="" className={style.EMAIL}>
              <label htmlFor="">이메일</label>
              <div className={style.email_input}>
                <input type="text" placeholder="이메일 앞자리" />
                <label>@</label>
                <input type="text" />
              </div>
              <ul className={style.email_link}>
                <li>직접입력</li>
              </ul>
            </form>
          </div>
        </div>

        <button
          className={style.bluebutton}
          onClick={moveCompleteSignUpHandler}
        >
          다음
        </button>
      </div>
      <Footer />
    </div>
  );
}
