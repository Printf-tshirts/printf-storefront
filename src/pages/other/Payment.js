import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderAPI, getOrdersAPI } from "../../apis/orders.api";
import { useDispatch, useSelector } from "react-redux";
import { getCartAPI } from "../../apis/cart.api";
import cogoToast from "cogo-toast";
import { setOrders } from "../../store/slices/order-slice";
import { resetCart } from "../../store/slices/cart-slice";
import { RAZOR_PAY_KEY_ID } from "../../constants";
import { addPaymentAPI } from "../../apis/payments.api";

export const Payment = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { selectedAddress } = useSelector((state) => state.address);
  const handlePaymentSuccess = async (payment_id) => {
    const response = await getCartAPI();
    const payload = {
      user: currentUser._id,
      cart: response.data.cart._id,
      address: selectedAddress._id,
      razorpay_payment_id: payment_id,
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
  const paymentHandler = async (e) => {
    const response = await getCartAPI();
    const cart = response.data.cart;
    const options = {
      key: RAZOR_PAY_KEY_ID,
      name: "PrintCoder",
      description: "Thank you for shopping with us",
      amount: response.data.cart.finalPrice * 100,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const captureResponse = await addPaymentAPI({
            paymentId,
            amount: cart.finalPrice,
          });
          handlePaymentSuccess(paymentId);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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
                  <button onClick={paymentHandler}>Pay Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
