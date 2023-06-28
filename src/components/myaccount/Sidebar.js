import React, { Fragment } from "react";
import { Menu, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../store/slices/cart-slice";
import { resetUser } from "../../store/slices/user-slice";
import { resetAddresses } from "../../store/slices/address-slice";
const { Sider } = Layout;
export const Sidebar = ({ selectedKey }) => {
  let dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const menuItems = [
    {
      key: "1",
      label: "My Account",
      icon: <UserOutlined />,
      url: "/my-account",
    },
    {
      key: "2",
      label: "My Orders",
      icon: <UserOutlined />,
      url: "/my-orders",
    },
    {
      key: "3",
      label: "My Addresses",
      icon: <UserOutlined />,
      url: "/my-addresses",
    },
    {
      key: "4",
      label: "Change Password",
      icon: <UserOutlined />,
      url: "/change-password",
    },
    {
      key: "5",
      label: "Logout",
      icon: <UserOutlined />,
      url: "/logout",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionId");
    dispatch(resetCart());
    dispatch(resetUser());
    dispatch(resetAddresses());
  };
  const handleMenuClick = (e) => {
    console.log("click", e);
    if (e.key === "5") {
      handleLogout();
    } else {
      menuItems.forEach((item) => {
        if (item.key === e.key) {
          window.location.href = item.url;
        }
      });
    }
  };
  return (
    <Fragment>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}>
        <div className="card m-2">
          <div className="card-body">
            <h5 className="card-title">Welcome {currentUser?.name}!</h5>
            <p className="card-text" style={{ fontSize: "12px" }}>
              {currentUser?.email}
            </p>
          </div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          items={menuItems}
          onClick={(e) => {
            handleMenuClick(e);
          }}
        />
      </Sider>
    </Fragment>
  );
};
