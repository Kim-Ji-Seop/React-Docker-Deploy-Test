import { NavLink } from 'react-router-dom';
import classes from './OrderButton.module.css';

const OrderButton = (props) => {

    const clickHandler = () => {
        if (typeof props.onShowStore === 'function') {
            props.onShowStore();
        }
    };

    const onReceptionHandler = () => {
        props.onActiveHandler(props.reception)
        props.onReceptionHandler(props.reception)
    }

    if (props.content === '떨이 등록 / 수정') {
        return (
            <NavLink to={props.to} className={`${classes['order-container']} ${classes[props.classes]}`}>
                {props.content}
            </NavLink>
        )
    } else if (props.content === '영업 종료') {
        return (
            <div className={`${classes['order-container']} ${classes[props.classes]}`}>
                <button className={`${classes['order-button']}`} onClick={clickHandler}>
                    {props.content}
                </button>
            </div>
        )
    }
    return (
        // <NavLink to={props.to} className={({ isActive }) =>
        //     isActive ? `${classes['order-button']} ${classes[props.classes]} ${classes.active}` : `${classes['order-button']} ${classes[props.classes]}`
        // } onClick={clickHandler}>
        //     {props.content}
        // </NavLink>
        <div className={`${classes['order-container']} ${classes[props.classes]}`}>
            <button className={`${classes['order-button']} ${classes[props.active]}`} onClick={onReceptionHandler}>
                {props.content}
            </button>
        </div>

    );
};

export default OrderButton;