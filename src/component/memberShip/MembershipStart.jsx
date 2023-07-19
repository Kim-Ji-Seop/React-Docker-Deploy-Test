import React, { useEffect, useState } from "react";
import style from "./MembershipStart.module.css";
import { ReactComponent as CheckOff } from "../../assets/images/check_off.svg";
import { ReactComponent as CheckOn } from "../../assets/images/check_on.svg";
import { ReactComponent as Arrow } from "../../assets/images/arrow.svg";
import AgreeAlert from "./AgreeAlert.jsx";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_AGREEMENT } from "../../store/membership";

// AgreeList 컴포넌트는 밑에 있어요!
export default function MembershipStart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [target, setTartget] = useState(null);
  const [click, setClick] = useState(false);
  const [allAgree, setAllAgree] = useState(false); //전체동의
  const [agreements, setAgreements] = useState({
    //개별동의 state
    mandatoryOne: false,
    mandatoryTwo: false,
    selectiveOne: false,
    isSns: false,
    isEmail: false,
    isPhone: false,
  });

  const [twoState, setTwoState] = useState(
    agreements.isSns && agreements.isEmail && agreements.isPhone
  );

  //모달창 닫기
  const handleClose = () => {
    setClick(false);
  };
  //모달창 열기
  const handleClick = (param) => {
    setTartget(param);
    setClick(true);
  };

  const stateHandler = (name) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const allAgreementChangeHandler = (event) => {
    const { checked } = event.target;
    setAgreements((prev) =>
      Object.keys(prev).reduce((newAgreements, agreementKey) => {
        newAgreements[agreementKey] = checked;
        return newAgreements;
      }, {})
    );
    setAllAgree(checked);
  };

  const handleIndividualAgree = (name) => {
    if (name === "selectiveTwo") {
      return;
    }
    setAgreements((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  useEffect(() => {
    if (agreements.isSns && agreements.isPhone && agreements.isEmail) {
      setTwoState(true);
      if (
        agreements.mandatoryOne &&
        agreements.mandatoryTwo &&
        agreements.selectiveOne &&
        twoState
      ) {
        setAllAgree(true);
      } else {
        setAllAgree(false);
      }
    } else {
      setTwoState(false);
      setAllAgree(false);
    }
  }, [agreements, twoState, allAgree]);

  const twoAllChangeHandler = (type) => {
    if (type === "all") {
      setAgreements((prev) => ({
        ...prev,
        isSns: true,
        isEmail: true,
        isPhone: true,
      }));
    } else {
      setAgreements((prev) => ({
        ...prev,
        isSns: false,
        isEmail: false,
        isPhone: false,
      }));
    }
  };

  const moveMembershipPhoneHandler = () => {
    if (!agreements.mandatoryOne || !agreements.mandatoryTwo) {
      alert("필수 동의를 확인해주세요.");
      return;
    }
    // setJoinUser({
    //   agreements: agreements,
    //   uid: null,
    //   name: null,
    //   birthday: null,
    //   phone: null,
    //   password: null,
    //   email: null,
    // });
    dispatch(
      SET_AGREEMENT({
        agreements: agreements,
        uid: '',
        name: '',
        birthday: '',
        phone: '',
        password: '',
        email: '',
      })
    );
    navigate("/signup/phone");
  };

  return (
    <div className={style.container}>
      {click && (
        <AgreeAlert
          individual={handleIndividualAgree}
          onClose={handleClose}
          target={target}
        />
      )}
      <Header login="login" />
      <div>
        <div className={style.start_contents}>
          <span className={style.start_title}>
            재떨이사장님 회원가입을 시작합니다.
          </span>
          <p className={style.start_desc}>
            재떨이사장님 회원이 되면 재떨이에서 제공하는 모든 사장님서비스를
            편하게 이용하실 수 있어요.
          </p>

          <div className={style.full_agreement}>
            <input
              id="checkbox"
              type="checkbox"
              checked={allAgree}
              onChange={allAgreementChangeHandler}
            />
            <label htmlFor="checkbox">전체 동의</label>
          </div>

          <div className={style.agree_first}>
            <span>서비스 이용을 위해 동의가 필요합니다.</span>
            <ul>
              <AgreeList
                checked={agreements.mandatoryOne}
                arrow={true}
                more={click}
                onClick={handleClick}
                desc="[필수] 이용약관 동의"
                param="mandatoryOne"
                stateHandler={stateHandler}
                state={agreements}
              />
              <AgreeList
                checked={agreements.mandatoryTwo}
                arrow={true}
                more={click}
                onClick={handleClick}
                desc="[필수] 개인정보 수집이용 동의"
                param="mandatoryTwo"
                stateHandler={stateHandler}
                state={agreements}
              />
            </ul>
          </div>

          <div className={style.agree_second}>
            <span>특별한 혜택과 최신 소식을 받아보세요!</span>
            <ul className={style.top}>
              <AgreeList
                checked={agreements.selectiveOne}
                more={click}
                onClick={handleClick}
                desc="[선택] 서비스/이벤트 정보 제공을 위한 개인정보 수집 이용 동의"
                param="selectiveOne"
                stateHandler={stateHandler}
                state={agreements}
              />
              <AgreeList
                checked={twoState}
                arrow={true}
                more={click}
                onClick={handleClick}
                desc="[선택] 광고성 정보 수신동의"
                param="selectiveTwo"
                stateHandler={stateHandler}
                state={agreements}
                twoAllChangeHandler={twoAllChangeHandler}
              />
            </ul>
            <ul className={style.option}>
              <AgreeList
                checked={agreements.isSns}
                desc="SMS"
                param="isSns"
                onClick={handleClick}
                stateHandler={stateHandler}
                state={agreements}
              />
              <AgreeList
                checked={agreements.isEmail}
                desc="이메일"
                param="isEmail"
                stateHandler={stateHandler}
                state={agreements}
              />
              <AgreeList
                checked={agreements.isPhone}
                desc="전화"
                param="isPhone"
                stateHandler={stateHandler}
                state={agreements}
              />
            </ul>
            <p className={style.information}>
              재떨이 회사가 제공하는 서비스의 광고성 정보를 수신합니다.
            </p>
          </div>

          <button
            className={style.phone_agree}
            onClick={moveMembershipPhoneHandler}
          >
            <p>휴대폰으로 인증하기</p>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function AgreeList({
  onClick,
  checked,
  desc,
  arrow,
  param,
  stateHandler,
  state,
  twoAllChangeHandler,
}) {
  const handleClick = () => {
    if (desc === "SMS" || desc === "이메일" || desc === "전화") {
      return;
    }
    onClick(param);
  };

  const changeStateHandler = (name) => {
    stateHandler(name);
  };

  const changeTwoHandler = (type) => {
    twoAllChangeHandler(type);
  };

  if (param === "selectiveTwo") {
    if (state["isSns"] && state["isEmail"] && state["isPhone"]) {
      return (
        <li>
          <CheckOn onClick={() => changeTwoHandler("none")} />
          <p onClick={handleClick}>{desc}</p>
          {arrow && <Arrow />}
        </li>
      );
    }
    return (
      <li>
        <CheckOff onClick={() => changeTwoHandler("all")} />
        <p onClick={handleClick}>{desc}</p>
        {arrow && <Arrow />}
      </li>
    );
  }

  return (
    <li>
      {state[param] && <CheckOn onClick={() => changeStateHandler(param)} />}
      {!state[param] && <CheckOff onClick={() => changeStateHandler(param)} />}
      <p onClick={handleClick}>{desc}</p>
      {arrow && <Arrow />}
    </li>
  );
}
