import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderAPI, getOrdersAPI } from "../../apis/orders.api";
import { useDispatch, useSelector } from "react-redux";
import { getCartAPI } from "../../apis/cart.api";
import cogoToast from "cogo-toast";
import { addOrder, setOrders } from "../../store/slices/order-slice";
import { resetCart } from "../../store/slices/cart-slice";

export const Payment = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { selectedAddress } = useSelector((state) => state.address);
  const handlePaymentSuccess = async () => {
    const response = await getCartAPI();
    const payload = {
      user: currentUser._id,
      cart: response.data.cart._id,
      address: selectedAddress._id,
      status: "placed",
    };
    await addOrderAPI({ order: payload }).then((res) => {
      cogoToast.success("Order Placed", { position: "top-center" });
      dispatch(resetCart());
    });
    await getOrdersAPI().then((res) => {
      dispatch(setOrders({ orders: res.data.orders }));
      navigate("/my-orders");
    });
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Payment"
        description="payment page of printcoder.com"
      />
      <LayoutOne>
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Payment", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="container">
          <div className="row justify-content-center m-3">
            <div className="text-center">
              <h1>Payment</h1>
              <div className="your-order-area w-25 m-3">
                <div className="place-order mt-25">
                  <button
                    type="submit"
                    onClick={() => {
                      handlePaymentSuccess();
                    }}
                    className="btn-hover">
                    Payment Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
