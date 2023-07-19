import { useState } from "react";
import {
  formatMenuList,
  formatTime,
  getTimeDifferenceMessage,
} from "../../../../common/Format";
import classes from "./OrderItem.module.css";
import { getCookieToken } from "../../../../store/common/Cookie";

const OrderItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPickup, setIsPickup] = useState(false);
  const orderTime = props.reception.orderTime;
  const pickUpTime = props.reception.pickUpTime;
  const price = props.reception.totalPrice;
  const formattedOrderTime = formatTime(orderTime);
  const formattedPickUpTime = formatTime(pickUpTime);
  const formattedPrice = price.toLocaleString();

  const formattedMenuString = formatMenuList(props.reception.orderItem);
  const timeMessage = getTimeDifferenceMessage(pickUpTime);

  const receiveOrderHandler = async (orderIdx, status) => {
    try {
      // 접수 API 호출
      await props.onReceiveOrder(orderIdx, status);
      // 접수 완료 시 상태 업데이트
      setIsChecked(true);
    } catch (error) {
      console.log(error);
    }
  };

  // 이미 접수나 취소된 주문인 경우 해당 항목을 숨김
  if (isChecked) {
    return null;
  }

  const completePickupHandler = async(orderIdx) => {
    try {
      // 픽업완료 API 호출
      await props.onCompletePickupHandler(orderIdx);
      // 픽업 완료 시 상태 업데이트
      setIsPickup(true);
    } catch (error) {
      console.log(error);
    }
  }

  // 이미 접수 완료일 경우 해당 항목을 숨김
  if (isPickup) {
    return null;
  }

  return (
    <div className={classes["outer-container"]}>
      <div className={classes["inner-container"]}>
        <h1 className={classes.time}>
          {formattedOrderTime}
          {props.isStatus !== "waiting" && (
            <div className={classes["order-number-container"]}>
              <p className={classes["order-number"]}>주문번호</p>
              <h1>{props.reception.orderSequence}</h1>
            </div>
          )}
        </h1>
        <div className={classes["menu-container"]}>
          <div>
            <div className={classes["top-menu"]}>
              <p
                className={`${classes["menu"]} ${classes["p-margin"]} ${classes["count"]}`}
              >
                [메뉴 {props.reception.menuDiverse}개] {formattedPrice}원
              </p>
              <div
                className={`${classes["ispayment-button"]} ${classes["p-margin"]} ${classes["count"]}`}
              >
                {props.reception.payStatus}
              </div>
              {props.isStatus !== "complete" && props.reception.request !== "" && (
                <div className={classes["ispayment-button"]}>요청있음</div>
              )}
            </div>
            <p
              className={`${classes["menu"]} ${classes["p-margin"]} ${classes["menu-detail"]}`}
            >
              {formattedMenuString}
            </p>
            <p className={`${classes["menu"]} ${classes["p-margin"]}`}>
              {formattedPickUpTime} 픽업 예정
            </p>
          </div>
          <div>
            <p className={`${classes["p-margin"]} ${classes["order-request"]}`}>
              {props.reception.request}
            </p>
          </div>
        </div>
        {props.isStatus === "waiting" && (
          <div className={classes["button-div"]}>
            <button
              className={`${classes.btn} ${classes["order-print"]}`}
              onClick={() => props.onClick(props.reception.orderIdx)}
            >
              주문표
              <br />
              인쇄
            </button>
            <button className={`${classes.btn} ${classes["order-cancel"]}`} onClick={() => receiveOrderHandler(props.reception.orderIdx, 'D')} >
              주문
              <br />
              취소하기
            </button>

            <button
              className={`${classes.btn} ${classes["do-order"]}`}
              onClick={() => receiveOrderHandler(props.reception.orderIdx, 'P')}
            >
              접수
              <br />
              하기
            </button>
          </div>
        )}
        {props.isStatus === "process" && (
          <div className={classes["button-div"]}>
            <button
              className={`${classes.btn} ${classes["order-print"]}`}
              onClick={() => props.onClick(props.reception.orderIdx)}
            >
              주문표
              <br />
              인쇄
            </button>
            <button className={`${classes.btn} ${classes["order-cancel"]}`}>
              픽업까지
              <br />
              {timeMessage}
            </button>
            <button className={`${classes.btn} ${classes["do-order"]}`} onClick={() => completePickupHandler(props.reception.orderIdx)}>
              픽업
              <br />
              완료
            </button>
          </div>
        )}
        {props.isStatus === "complete" && (
          <div className={classes["button-div"]}>
            <button className={`${classes.btn} ${classes["do-order"]}`}>
              영수증
              <br />
              인쇄
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
