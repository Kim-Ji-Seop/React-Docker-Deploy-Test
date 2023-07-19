import Header from "./component/header/Header";
import ManageReview from "./component/main/ManageReview";
import TodayMenu from "./component/main/TodayMenu";
import TodayOrder from "./component/main/TodayOrder";
import ManageSale from "./component/main/ManageSale";

// Membership
import MembershipStart from "./component/memberShip/MembershipStart";
import MembershipInformation from "./component/memberShip/MembershipInformation";
import MembershipEnd from "./component/memberShip/MembershipEnd";

// login
import LoginStart from "./component/login/LoginStart";
import Search from "./component/login/Search";
import IDShow from "./component/login/IDShow";
import PasswordNew from "./component/login/PasswordNew";

import Regist1 from "./component/register/Regist1";
import Regist2 from "./component/register/Regist2";
import Regist3 from "./component/register/Regist3";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SideBar from "./component/sidebar/SideBar";
import Home from "./component/home/Home";
import MembershipPhone from "./component/memberShip/MembershipPhone";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  // Membership
  { path: "/signup/agree", element: <MembershipStart /> },
  { path: "/signup/phone", element: <MembershipPhone /> },
  { path: "/signup/begin", element: <MembershipInformation /> },
  { path: "/signup/complete", element: <MembershipEnd /> },
  // login
  { path: "/login", element: <LoginStart /> },
  { path: "/help", element: <Search /> },
  { path: "/help/complete", element: <IDShow /> },
  { path: "/help/new-pw", element: <PasswordNew /> },
  //
  { path: "/today/menu", element: <TodayMenu /> },
  { path: "/today/order", element: <TodayOrder /> },
  { path: "/review", element: <ManageReview /> },
  { path: "/sales", element: <ManageSale /> },
  { path: "/register/store", element: <Regist1 /> },
  { path: "/register/menu", element: <Regist2 /> },
  { path: "/register/origin", element: <Regist3 /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
