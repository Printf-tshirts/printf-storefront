import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  getUserAPI,
  loginUserAPI,
  registerUserAPI,
} from "../../apis/users.api";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../store/slices/user-slice";
import { useEffect } from "react";
import { getCartAPI } from "../../apis/cart.api";
import { setCart, setUserInCart } from "../../store/slices/cart-slice";
import { setAddresses } from "../../store/slices/address-slice";
import { getAddressesAPI } from "../../apis/addresses.api";
import { getOrdersAPI } from "../../apis/orders.api";
import { setOrders } from "../../store/slices/order-slice";
import { getShippingsAPI } from "../../apis/shipping.api";
import {
  selectShipping,
  setShippings,
} from "../../store/slices/shipping-slice";

const LoginRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    if (currentUser && cartItems.length > 0) {
      navigate("/cart");
    } else if (currentUser) {
      navigate("/");
    }
  }, [currentUser, cartItems, navigate]);
  let { pathname } = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("handleLogin");
    loginUserAPI({
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        getUserAPI().then(async (res) => {
          await getCartAPI().then((res) => {
            if (res.data.cart)
              dispatch(
                setCart({
                  user: res.data.cart.user,
                  cartItems: res.data.cart.items,
                  cartTotalPrice: res.data.cart.totalPrice,
                }),
              );
          });
          await getAddressesAPI().then((res) => {
            dispatch(
              setAddresses({
                addresses: res.data.addresses,
              }),
            );
          });
          await getOrdersAPI().then((res) => {
            dispatch(setOrders({ orders: res.data.orders }));
          });
          await getShippingsAPI().then((res) => {
            dispatch(setShippings({ shippings: res.data.shippings }));
            dispatch(selectShipping(res.data.shippings[0]));
          });
          await dispatch(setCurrentUser(res.data.user));
          await dispatch(setUserInCart({ user: res.data.user._id }));
          cogoToast.success("Login Successful", { position: "top-center" });
        });
      })
      .catch((err) => {
        console.log("err", err);
        cogoToast.error(err.response.data.message, { position: "top-center" });
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("handleRegister");
    registerUserAPI({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then((res) => {
        console.log("res", res);
        cogoToast.success("Register Successful", { position: "top-center" });
      })
      .catch((err) => {
        console.log("err", err);
        cogoToast.error(err.response.data.message, { position: "top-center" });
      });
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLogin}>
                              <input
                                type="text"
                                name="email"
                                placeholder="Email"
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  {/* <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link> */}
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegister}>
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
