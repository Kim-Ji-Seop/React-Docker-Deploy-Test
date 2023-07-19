import React, { useState } from 'react'
import Header from '../header/Header'
import SideBar from '../sidebar/SideBar'
import OrderItems from './Layout/orderItems/OrderItems'
import PrintOrder from './Layout/modal/PrintOrder'
import FinishStore from './Layout/modal/FinishStore'
import { useDispatch } from 'react-redux'
import { SET_PRINT } from '../../store/print'

const Main3 = (props) => {
    const dispatch = useDispatch()
    const [orderPrintIsShown, setOrderPrintIsShown] = useState(false)
    const [storeFinishIsShown, setStoreFinishIsShown] = useState(false)

    const showOrderPrintHandler = (orderIdx) => {
        dispatch(
            SET_PRINT({
                orderIdx: orderIdx
            })
        )
        setOrderPrintIsShown(true)
    }

    const hideOrderPrintHandler = () => {
        setOrderPrintIsShown(false)
    }

    const showStoreFinishHandler = () => {
        setStoreFinishIsShown(true)
    }

    const hideStoreFinishHandler = () => {
        setStoreFinishIsShown(false)
    }

    return (
        <React.Fragment>
            {orderPrintIsShown && <PrintOrder onClose={hideOrderPrintHandler} />}
            {storeFinishIsShown && <FinishStore onClose={hideStoreFinishHandler} />}
            <Header />
            <SideBar />
            <OrderItems isStatus={props.status} onShowPrint={showOrderPrintHandler} onShowStore={showStoreFinishHandler} />
        </React.Fragment>
    )
}

export default Main3