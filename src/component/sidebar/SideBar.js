import { NavLink } from 'react-router-dom'
import classes from './SideBar.module.css'

const SideBar = (props) => {
    return (
        <div className={classes.wrapper}>
            <ui className={classes.mainMenu}>
                <li id="tteoli" className={classes.item}>
                    <NavLink to='/today/menu' className={classes.btn}><i></i>· 오늘의 떨이</NavLink>
                    <div className={classes.subMenu}>
                        <NavLink to='/today/menu' className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        } ><i></i>· 떨이 등록/수정</NavLink>
                        <NavLink to='/today/order' className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        } ><i></i>· 주문 현황</NavLink>
                    </div>
                </li>
                <li className={classes.item} id="management">
                    <NavLink to='/review' className={classes.btn} ><i></i>가게 관리</NavLink>
                    <div className={classes.subMenu} >
                        <NavLink to='/review' className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        } ><i></i>· 리뷰 관리/수정</NavLink>
                        <NavLink to='/sales' className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        } ><i></i>· 매출관리</NavLink>
                    </div>
                </li>
                <li className={classes.item} id="operation">
                    <NavLink to='/operation' className={classes.btn}><i></i>가게 운영</NavLink>
                    <div className={classes.subMenu} >
                        <NavLink to='/operation' className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        } ><i></i>· 가게 정보 수정</NavLink>
                    </div>
                </li>
            </ui>
        </div>
    )
}

export default SideBar