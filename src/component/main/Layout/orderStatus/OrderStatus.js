import classes from './OrderStatus.module.css'
import OrderButton from '../../UI/OrderButton'
import { useState } from 'react';

const OrderStatus = (props) => {

    const [activeButton, setActiveButton] = useState('waiting');

    const onReceptionHandler = (reception) => {
        props.onReceptionHandler(reception)
    }

    const onActiveHandler = (reception) => {
        setActiveButton(reception);
    };

    return (
        <div className={classes['order-container']}>
            <OrderButton classes='order' active={activeButton === 'waiting' ? 'active' : ''} content='접수대기' onReceptionHandler={onReceptionHandler} reception='waiting' onActiveHandler={onActiveHandler} />
            <OrderButton classes='order' active={activeButton === 'process' ? 'active' : ''} content='처리중' onReceptionHandler={onReceptionHandler} reception='process' onActiveHandler={onActiveHandler} />
            <OrderButton classes='order' active={activeButton === 'complete' ? 'active' : ''} content='완료' onReceptionHandler={onReceptionHandler} reception='complete' onActiveHandler={onActiveHandler} />
            <OrderButton classes='order' content='떨이 등록 / 수정' to='/today/menu' />
            <OrderButton classes='finish' content='영업 종료' onShowStore={props.onShowStore} />
        </div>
    )
}

export default OrderStatus;