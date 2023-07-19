import { useEffect, useState, useRef } from "react";
import OrderStatus from "../orderStatus/OrderStatus";
import OrderItem from "./OrderItem";
import classes from "./OrderItems.module.css";
import { getCookieToken } from "../../../../store/common/Cookie";

const OrderItems = (props) => {
  const [receptionStatus, setReceptionStatus] = useState("waiting");
  const [receptionList, setReceptionList] = useState([]);
  const innerContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async (receptionStatus) => {
      try {
        let word = "";
        if (receptionStatus === "waiting") {
          word = "wait";
        } else if (receptionStatus === "process") {
          word = "process";
        } else if (receptionStatus === "complete") {
          word = "complete";
        }
        const response = await fetch(
          `https://www.insung.shop/jat/orders/${word}`,
          {
            method: "GET",
            headers: {
              "X-ACCESS-TOKEN": getCookieToken(),
            },
          }
        );
        const data = await response.json();
        if (!data["isSuccess"]) {
          console.log(data["message"]);
          return;
        }
        const result = data["result"];
        setReceptionList(result["orderLists"]);
      } catch (err) {
        console.log(err);
      }
    };

    window.scrollTo(0, 0);
    if (innerContainerRef.current) {
      innerContainerRef.current.scrollTop = 0;
    }
    fetchData(receptionStatus);
  }, [receptionStatus]);

  const onReceptionHandler = (reception) => {
    setReceptionStatus(reception);
  };

  const receiveOrderHandler = async (orderIdx, status) => {
    const requestBody = {
      orderIdx: orderIdx,
      status: status,
    };
    console.log(requestBody)
    try {
      // 주문 접수 API 호출
      const response = await fetch(
        "https://www.insung.shop/jat/orders/receive",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": getCookieToken(),
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      if (!data.isSuccess) {
        console.log(data.message);
        return;
      }
      console.log(data);
      // 목록 업데이트
      const updatedReceptionList = receptionList.filter(
        (reception) => reception.orderIdx !== orderIdx
      );
      setReceptionList(updatedReceptionList);
    } catch (error) {
      console.log(error);
    }
  };

  const completePickupHandler = async (orderIdx) => {
    const requestBody = {
      orderIdx: orderIdx,
    };
    try {
      // 주문 접수 API 호출
      const response = await fetch(
        "https://www.insung.shop/jat/orders/pickup",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": getCookieToken(),
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      if (!data.isSuccess) {
        console.log(data.message);
        return;
      }
      console.log(data);
      // 목록 업데이트
      const updatedReceptionList = receptionList.filter(
        (reception) => reception.orderIdx !== orderIdx
      );
      setReceptionList(updatedReceptionList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["outer-container"]}>
      <div className={classes["button-container"]}>
        <OrderStatus
          onShowStore={props.onShowStore}
          onReceptionHandler={onReceptionHandler}
        />
      </div>
      <div className={classes["inner-container"]} ref={innerContainerRef}>
        {receptionList.map((reception) => (
          <OrderItem
            key={reception.orderIdx}
            isStatus={receptionStatus}
            onClick={props.onShowPrint}
            reception={reception}
            onReceiveOrder={receiveOrderHandler}
            onCompletePickupHandler={completePickupHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
