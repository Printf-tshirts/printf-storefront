import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { resetUser } from "../../store/slices/user-slice";
import { resetCart } from "../../store/slices/cart-slice";
import { resetAddresses } from "../../store/slices/address-slice";
import { Form, Input } from "antd";

const IconGroup = ({ iconWhiteClass }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu",
    );
    offcanvasMobileMenu.classList.add("active");
  };

  let dispatch = useDispatch();
  let { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { items } = useSelector((state) => state.cart);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionId");
    dispatch(resetCart());
    dispatch(resetUser());
    dispatch(resetAddresses());
  };
  const handleAccountClick = (e) => {
    if (currentUser) {
      window.location.href = "/my-account";
    } else {
      window.location.href = "/login-register";
    }
  };
  const handleSearch = (values) => {
    navigate("/search/" + values.searchTerm);
  };

  return (
    <div className={clsx("header-right-wrap ", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        {/* <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button> */}
        <div className="search-content active">
          <Form onFinish={handleSearch}>
            <Form.Item name={"searchTerm"}>
              <Input
                type="text"
                placeholder="Search for a product, design and more"
              />
            </Form.Item>
            {/* <button className="button-search">
              <i className="pe-7s-search" />
            </button> */}
          </Form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleAccountClick(e)}>
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            {currentUser ? (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    My account
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/orders"}>My Orders</Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/store"}>My Store</Link>
                </li>
                <li>
                  <Link
                    onClick={() => handleLogout()}
                    to={process.env.PUBLIC_URL + pathname}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div> */}
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {items && items.length ? items.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {items && items.length ? items.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}>
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
