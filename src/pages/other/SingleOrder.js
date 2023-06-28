import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchOrder } from "../../store/actions/order-action";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Loader } from "../../components/loader";
import { Card, Table } from "antd";
import Meta from "antd/es/card/Meta";

export const SingleOrder = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  let { orderHandle } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.order);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login-register");
    }
  }, [currentUser, navigate]);
  useEffect(() => {
    dispatch(fetchOrder({ orderHandle })).then(() => setLoading(false));
  }, [orderHandle, dispatch]);
  useEffect(() => {
    if (!loading && !selectedOrder) {
      window.location.href = "/404";
    }
  }, [loading, selectedOrder]);
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <span>
          <img
            alt={title}
            src={record.product.images[0].src}
            style={{ height: "80px", objectFit: "contain" }}
          />
          {title}
        </span>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹ ${price}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `₹ ${total}`,
    },
  ];

  const dataSource = selectedOrder?.cart.items.map((item) => ({
    key: item.cartItemId,
    product: item.variant,
    color: item.variant.color.name,
    size: item.size,
    price: item.variant.price,
    quantity: item.quantity,
    total: item.variant.price * item.quantity,
  }));
  return (
    <>
      <Fragment>
        <SEO
          titleTemplate="Single Order"
          description="My Order page of flone react minimalist eCommerce template."
        />
        <LayoutOne>
          {/* breadcrumb */}
          {loading ? (
            <Loader />
          ) : (
            <>
              <Breadcrumb
                pages={[
                  { label: "Home", path: process.env.PUBLIC_URL + "/" },
                  {
                    label: "My Orders",
                    path: process.env.PUBLIC_URL + "/my-orders",
                  },
                  {
                    label: selectedOrder?.handle,
                    path: process.env.PUBLIC_URL + pathname,
                  },
                ]}
              />
              <div className="container">
                <div className="invoice my-3">
                  <div className="invoice-header">
                    <h2>Order Invoice</h2>
                    <div className="invoice-info">
                      <div>
                        <strong>Order ID:</strong> {selectedOrder.handle}
                      </div>
                      <div>
                        <strong>Date:</strong>{" "}
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="invoice-basic-details">
                    {/* <h3>Basic Details</h3> */}
                    <div>
                      <strong>Name:</strong> {selectedOrder.user.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedOrder.user.email}
                    </div>
                  </div>

                  <div className="invoice-items">
                    <h3>Items</h3>
                    <Table
                      scroll={{
                        x: 500,
                      }}
                      columns={columns}
                      dataSource={dataSource}
                      pagination={false}
                    />
                  </div>
                  <div className="d-flex flex-md-row flex-column align-items-center">
                    <div className="invoice-address w-50 mx-2">
                      <Card
                        title="Shipping Details"
                        className="invoice-address-card">
                        <div className="summary-item">
                          <div className="summary-item-label">Address:</div>
                          <div className="summary-item-value d-flex flex-column align-items-end">
                            <div>{selectedOrder.address.name}, </div>
                            <div>
                              {selectedOrder.address.address1},{" "}
                              {selectedOrder.address.address2},
                            </div>
                            <div>
                              {selectedOrder.address.city},{" "}
                              {selectedOrder.address.state},{" "}
                              {selectedOrder.address.postcode}
                            </div>
                          </div>
                        </div>
                        <div className="summary-item">
                          <div className="summary-item-label">Phone:</div>
                          <div className="summary-item-value">
                            {selectedOrder.address.phone}
                          </div>
                        </div>
                        <div className="summary-item">
                          <div className="summary-item-label">Email:</div>
                          <div className="summary-item-value">
                            {selectedOrder.address.email}
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="invoice-summary w-50 mx-3">
                      <Card
                        className="invoice-summary-card"
                        title="Order Summary">
                        <div className="summary-item">
                          <div className="summary-item-label">Subtotal:</div>
                          <div className="summary-item-value">
                            ₹{selectedOrder.cart.totalPrice}
                          </div>
                        </div>
                        <div className="summary-item">
                          <div className="summary-item-label">Shipping:</div>
                          <div className="summary-item-value">
                            ₹{selectedOrder.cart.shipping.price}
                          </div>
                        </div>
                        <div className="summary-item">
                          <div className="summary-item-label">Discount:</div>
                          <div className="summary-item-value">
                            - ₹{selectedOrder.cart?.discountPrice || 0}
                          </div>
                        </div>
                        <div className="summary-item total">
                          <div className="summary-item-label">Total:</div>
                          <div className="summary-item-value">
                            ₹{selectedOrder.cart.finalPrice}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </LayoutOne>
      </Fragment>
    </>
  );
};
