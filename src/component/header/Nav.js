import { useNavigate } from "react-router";
import { getCookieToken, removeCookieToken } from "../../store/common/Cookie";
import style from "./Nav.module.css";

const Nav = (props) => {

  const navigate = useNavigate()
  const jwt = getCookieToken();

  const moveLoginHandler = () => {
    navigate('/login')
  }

  const logoutHandler = () => {
    removeCookieToken();
    navigate('/')
  }

  if(jwt){
    return <button className={style.nav_btn} onClick={logoutHandler}>로그아웃</button>;
  }

  return (
    <>
      {props.login ? <button className={style.nav_btn} onClick={moveLoginHandler} >로그인</button> : <></> }
    </>
  );
  
};

export default Nav;
