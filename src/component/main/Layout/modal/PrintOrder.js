import { useSelector } from "react-redux";
import Modal from "../../UI/Modal";
import classes from "./PrintOrder.module.css";
import React, { useEffect, useState } from "react";
import { getCookieToken } from "../../../../store/common/Cookie";

const PrintOrder = (props) => {
  const printOrderIdx = useSelector((state) => state.print.value.orderIdx);
  const [resultPrintOrder, setResultPrintOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          orderIdx: printOrderIdx,
        };
        console.log(JSON.stringify(requestBody));
        const response = await fetch(
          "https://www.insung.shop/jat/orders/bills",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-ACCESS-TOKEN": getCookieToken(),
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        if (!data["isSuccess"]) {
          console.log(data["message"]);
          return;
        }
        const result = data["result"];
        console.log(result);
        setResultPrintOrder(result);
      } catch (err) {
        console.log("에러");
        console.log(err);
      }
    };
    fetchData();
  }, [printOrderIdx]);

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <div className={classes.top}>
          <span>주문표</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClose}
          >
            <g id="Frame" clip-path="url(#clip0_811_577)">
              <path
                id="Color"
                d="M12 1.5L10.5 0L6 4.5L1.5 0L0 1.5L4.5 6L0 10.5L1.5 12L6 7.5L10.5 12L12 10.5L7.5 6L12 1.5Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_811_577">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={classes["order-print"]}>
          <table className={classes.table}>
            <tr className={classes.blank}>
              <td className={classes["td-title"]}>일자</td>
              <td className={classes["td-content"]}>
                {resultPrintOrder.orderDate}
              </td>
              <td className={classes["td-title"]}>결제여부</td>
              <td className={classes["td-content"]}>
                카드 {resultPrintOrder.paymentStatus}
              </td>
            </tr>
            <tr className={classes.blank}>
              <td className={classes["td-title"]}>픽업시간</td>
              <td className={classes["td-content"]}>
                {resultPrintOrder.pickUpTime}
              </td>
              <td className={classes["td-title"]}>주문번호</td>
              <td className={classes["td-content"]}>
                {resultPrintOrder.orderSequence}
              </td>
            </tr>
            <tr className={`${classes.blank} ${classes["final-blank"]}`}>
              <td className={classes["td-title"]}>주문 내역</td>
              <td className={classes["td-content"]}>
                {resultPrintOrder.orderItem
                  ? resultPrintOrder.orderItem.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.menuName} {item.menuCnt}개
                        <br />
                      </React.Fragment>
                    ))
                  : null}
              </td>
              <td className={classes["td-title"]}>요구 사항</td>
              <td className={classes["td-content"]}>
                {resultPrintOrder.request}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default PrintOrder;
