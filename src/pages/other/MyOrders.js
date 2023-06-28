import React, { useEffect } from "react";
import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import { Sidebar } from "../../components/myaccount/Sidebar";
import { Layout, Table } from "antd";
const { Content } = Layout;
export const MyOrders = () => {
  let { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login-register");
    }
  }, [currentUser, navigate]);

  const orderColumns = [
    {
      title: "Order Id",
      dataIndex: "handle",
      key: "handle",
    },
    {
      title: "Order Date",
      key: "orderDate",
      render: (text, record) => (
        <span>{new Date(record.createdAt).toDateString()}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: "Total",
      key: "total",
      render: (text, record) => <span>{record.cart.finalPrice}</span>,
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) => <span>{record.address.name}</span>,
    },
  ];

  return (
    <Fragment>
      <SEO
        titleTemplate="My Orders"
        description="My Orders page of flone react minimalist eCommerce template."
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Orders", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className=" d-flex container">
          <Sidebar selectedKey={"2"} />
          <div className="w-100 m-3">
            <Table
              onRow={(record) => {
                return {
                  style: { cursor: "pointer" },
                  onClick: () => {
                    navigate(`/my-orders/${record.handle}`);
                  },
                };
              }}
              dataSource={orders}
              columns={orderColumns}
            />
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
