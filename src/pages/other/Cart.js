import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  updateDiscountPrice,
} from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import { Form, Input } from "antd";
import { getCouponByCodeAPI } from "../../apis/coupons.api";
import cogoToast from "cogo-toast";
import { selectCoupon } from "../../store/slices/coupon-slice";

const Cart = () => {
  const navigate = useNavigate();
  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, cartTotalPrice, discountPrice } = useSelector(
    (state) => state.cart,
  );
  const { selectedCoupon } = useSelector((state) => state.coupon);
  const handleApplyCoupon = async (values) => {
    if (!currentUser?._id) {
      cogoToast.error("Please login to apply coupon", {
        position: "top-center",
      });
      navigate("/login-register");
      return;
    }
    const response = await getCouponByCodeAPI({ code: values.code });

    if (response.data.coupon) {
      let currentDiscountPrice = 0;
      if (response.data.minimumOrderAmount > cartTotalPrice) {
        cogoToast.error(
          `Minimum order amount should be ${response.data.minimumOrderAmount}`,
          { position: "top-center" },
        );
        removeCoupon();
        return;
      }
      if (response.data.coupon.type === "percentage") {
        currentDiscountPrice =
          cartTotalPrice * (response.data.coupon.value / 100);
        currentDiscountPrice = Math.min(
          currentDiscountPrice,
          response.data.coupon.maximumDiscountAmount,
        );
      } else {
        currentDiscountPrice = response.data.coupon.value;
      }
      dispatch(
        updateDiscountPrice({
          discountPrice: currentDiscountPrice,
          coupon: response.data.coupon,
        }),
      );
      dispatch(selectCoupon(response.data.coupon));
      cogoToast.success("Coupon Code applied", { position: "top-center" });
    } else {
      cogoToast.error(response.data.message || "Invalid Coupon Code", {
        position: "top-center",
      });
    }
  };
  const handleCouponCalculation = () => {
    if (!selectedCoupon?._id) return;
    let currentDiscountPrice = 0;
    if (selectedCoupon.minimumOrderAmount > cartTotalPrice) {
      cogoToast.error(
        `Minimum order amount should be ${selectedCoupon.minimumOrderAmount}`,
        { position: "top-center" },
      );
      removeCoupon();
      return;
    }
    if (selectedCoupon.type === "percentage") {
      currentDiscountPrice = cartTotalPrice * (selectedCoupon.value / 100);
      currentDiscountPrice = Math.min(
        currentDiscountPrice,
        selectedCoupon.maximumDiscountAmount,
      );
    } else {
      currentDiscountPrice = selectedCoupon.value;
    }
    dispatch(
      updateDiscountPrice({
        discountPrice: currentDiscountPrice,
        coupon: selectedCoupon,
      }),
    );
  };
  useEffect(() => {
    handleCouponCalculation();
  }, [cartTotalPrice, selectedCoupon, cartItems]);
  const removeCoupon = () => {
    dispatch(updateDiscountPrice({ discountPrice: 0, coupon: { _id: null } }));
    dispatch(selectCoupon(null));
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const variant = cartItem.variant;
                            const discountedPrice = variant.price;
                            const finalProductPrice = (
                              variant.compare_at_price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={`/${variant.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        variant.images[0].src
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={`/${variant.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
                                    {variant.title}
                                  </Link>
                                  {variant.color && cartItem.size ? (
                                    <div className="cart-item-variation">
                                      <span>Color: {variant.color.name}</span>
                                      <span>Size: {cartItem.size}</span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        dispatch(
                                          decreaseQuantity({
                                            ...cartItem,
                                            currentUser,
                                          }),
                                        )
                                      }>
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        dispatch(
                                          addToCart({
                                            ...cartItem,
                                            quantity: quantityCount,
                                            currentUser,
                                          }),
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(cartItem, cartItem.size)
                                      }>
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice * cartItem.quantity
                                      ).toFixed(2)
                                    : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        deleteFromCart({
                                          cartItemId: cartItem.cartItemId,
                                          currentUser,
                                        }),
                                      )
                                    }>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/tshirts"}>
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button
                          onClick={() =>
                            dispatch(deleteAllFromCart({ currentUser }))
                          }>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="row justify-content-end">
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-4 col-md-12 my-3">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      {selectedCoupon ? (
                        <>
                          <div className="discount-code">
                            <div> Coupon Applied!</div>
                            <div> Code: {selectedCoupon.discountCode}</div>
                            <button
                              className="cart-btn-2"
                              onClick={() => {
                                removeCoupon();
                              }}>
                              Remove Coupon
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="discount-code">
                            <p>Enter your coupon code if you have one.</p>
                            <Form onFinish={handleApplyCoupon}>
                              <Form.Item name={"code"}>
                                <Input type="text" />
                              </Form.Item>
                              <button className="cart-btn-2" type="submit">
                                Apply Coupon
                              </button>
                            </Form>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12 my-3">
                    <div className="grand-total">
                      <div className="title-wrap my-2">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      {selectedCoupon ? (
                        <h5>
                          Discount Price{" "}
                          <span>
                            - {currency.currencySymbol + discountPrice}
                          </span>
                        </h5>
                      ) : null}

                      <h4 className="grand-total-title">
                        Grand Total{" "}
                        <span>
                          {currency.currencySymbol}{" "}
                          {parseInt(cartTotalPrice) - parseInt(discountPrice)}
                        </span>
                      </h4>
                      <Link
                        to={
                          currentUser
                            ? `${process.env.PUBLIC_URL}/checkout`
                            : `/login-register`
                        }>
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
