import Input from "../../UI/Input";
import classes from "./Items.module.css";

const Items = (props) => {
    
  const menuList = props.menu.map((menu, index) => (
    <tr key={menu.menuIdx}>
      <th scope="row">{index + 1}</th>
      <td>
        <Input placeholder={menu.menuName} />
      </td>
      <td>
        <Input placeholder={menu.price} />
      </td>
      <td>
        <Input placeholder="0" />
      </td>
      <td>
        <Input placeholder="100" />
      </td>
    </tr>
  ));

  return (
    <div className={classes["items-container"]}>
      <div className={classes["title-container"]}>
        <div className={classes["inner-container"]}>
          <h1 className={classes.title}>{props.title}</h1>
          <p className={classes.subTitle}>{props.subTitle}</p>
        </div>
      </div>
      <div className={classes["table-container"]}>
        <table className={classes.type07}>
          <thead>
            <tr>
              <th scope="cols"></th>
              <th scope="cols">메뉴명</th>
              <th scope="cols">가격</th>
              <th scope="cols">할인율</th>
              <th scope="cols">수량</th>
            </tr>
          </thead>
          <tbody>{menuList}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;
