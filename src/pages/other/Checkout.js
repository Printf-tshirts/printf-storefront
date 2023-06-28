import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addAddressAPI } from "../../apis/addresses.api";
import cogoToast from "cogo-toast";
import { addAddress, selectAddress } from "../../store/slices/address-slice";
import { FormSelect } from "react-bootstrap";
import SelectedAddressComponent from "../../components/checkout/selectedAddressComponent";
import { updateShippingPrice } from "../../store/slices/cart-slice";

const Checkout = () => {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const currency = useSelector((state) => state.currency);
  const { currentUser } = useSelector((state) => state.user);
  const {
    cartItems,
    cartTotalPrice,
    shippingPrice,
    shippingAdded,
    discountPrice,
  } = useSelector((state) => state.cart);
  const { selectedCoupon } = useSelector((state) => state.coupon);
  const { addresses, selectedAddress } = useSelector((state) => state.address);
  const { selectedShipping } = useSelector((state) => state.shipping);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login-register");
    }
  }, [currentUser, navigate]);
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (addNewAddress) {
      const payload = {
        user: currentUser._id,
        name: e.target.name.value,
        address1: e.target.address1.value,
        address2: e.target.address2.value,
        city: e.target.city.value,
        state: e.target.state.value,
        postcode: e.target.postcode.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
      };
      addAddressAPI({ address: payload })
        .then(async (res) => {
          await dispatch(addAddress(res.data.address));
          await dispatch(selectAddress(res.data.address));
          navigate("/payment");
        })
        .catch((err) => {
          console.log("err", err);
          cogoToast.error(err.response.data, { position: "top-center" });
        });
    } else {
      navigate("/payment");
    }
  };
  const handleSelectAddress = (e) => {
    e.preventDefault();
    setAddNewAddress(false);
    setSelectedAddressId(e.target.value);
    if (e.target.value === "addNewAddress") {
      setAddNewAddress(true);
      return;
    }
  };
  useEffect(() => {
    if (selectedAddressId !== "addNewAddress") {
      const currentSelectedAddress = addresses.filter(
        (address) => address._id === selectedAddressId,
      )[0];
      dispatch(selectAddress(currentSelectedAddress));
      dispatch(updateShippingPrice({ shipping: selectedShipping }));
    }
  }, [selectedAddressId, addresses, dispatch, selectedShipping, shippingAdded]);

  useEffect(() => {
    if (selectedAddress) {
      setSelectedAddressId(selectedAddress._id);
    }
  }, [selectedAddress, dispatch]);
  useEffect(() => {
    if (!selectedAddress) {
      dispatch(selectAddress(addresses[0]));
    }
  }, [selectedAddress, addresses, dispatch]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleAddAddress}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Billing Details</h3>

                      <div className="row">
                        {addresses.length > 0 && (
                          <>
                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>Select Address</label>
                                <FormSelect
                                  onChange={handleSelectAddress}
                                  name="address"
                                  value={
                                    addNewAddress
                                      ? "addNewAddress"
                                      : selectedAddressId
                                  }>
                                  {addresses.map((address) => (
                                    <option value={address._id}>
                                      {address.name}
                                    </option>
                                  ))}
                                  <option value="addNewAddress">
                                    Add New Address
                                  </option>
                                </FormSelect>
                              </div>
                            </div>
                          </>
                        )}
                        {selectedAddress && !addNewAddress && (
                          <SelectedAddressComponent address={selectedAddress} />
                        )}
                        {!addNewAddress && (
                          <>
                            <div className="your-order-area w-50">
                              <div className="place-order my-3">
                                <button
                                  onClick={() => {
                                    setAddNewAddress(true);
                                  }}
                                  className="btn-hover">
                                  Add New Address
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                        {addNewAddress && (
                          <>
                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>Name</label>
                                <input name="name" type="text" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>Street Address</label>
                                <input
                                  className="billing-address"
                                  name="address1"
                                  placeholder="House number and street name"
                                  type="text"
                                />
                                <input
                                  name="address2"
                                  placeholder="Apartment, suite, unit etc."
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>Town / City</label>
                                <input name="city" type="text" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>State / County</label>
                                <input name="state" type="text" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Postcode / ZIP</label>
                                <input name="postcode" type="text" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Phone</label>
                                <input name="phone" type="text" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Email Address</label>
                                <input name="email" type="text" />
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="additional-info-wrap">
                        <h4>Additional information</h4>
                        <div className="additional-info">
                          <label>Order notes</label>
                          <textarea
                            placeholder="Notes about your order, e.g. special notes for delivery. "
                            name="order_message"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                const variantPrice = cartItem.variant.price;
                                const finalProductPrice = (
                                  cartItem.variant.compare_at_price *
                                  currency.currencyRate
                                ).toFixed(2);
                                const finalVariantPrice = (
                                  variantPrice * currency.currencyRate
                                ).toFixed(2);

                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.variant.title} ({cartItem.size})
                                      X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">
                                      {variantPrice !== null
                                        ? currency.currencySymbol +
                                          (
                                            finalVariantPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        : currency.currencySymbol +
                                          (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li>{selectedShipping.name}</li>
                              <li>
                                {currency.currencySymbol +
                                  selectedShipping.price.toFixed(2)}
                              </li>
                            </ul>
                          </div>
                          {discountPrice > 0 ? (
                            <div className="your-order-bottom">
                              <ul>
                                <li className="your-order-shipping">
                                  Discount
                                </li>
                                <li>{selectedCoupon.discountCode}</li>
                                <li>
                                  -{" "}
                                  {currency.currencySymbol +
                                    discountPrice.toFixed(2)}
                                </li>
                              </ul>
                            </div>
                          ) : null}
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {currency.currencySymbol}
                                {(
                                  parseInt(cartTotalPrice) +
                                  parseInt(shippingPrice) -
                                  parseInt(discountPrice)
                                ).toFixed(2)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>
                      <div className="place-order mt-25">
                        <button type="submit" className="btn-hover">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
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

export default Checkout;
