import { Link } from 'react-router-dom'
import style from './Login.module.css'

const Login = () => {
    return(
        <div className={style.btnContainer}>
            <Link to='/login'><button className={style.login}>Log in</button></Link>
            <Link to='/signup/agree'><button className={style.signup}>회원가입</button></Link>
        </div>
    )
}

export default Login