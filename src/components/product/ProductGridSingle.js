import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";

const ProductGridSingle = ({
  product,
  variant,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = variant.price;
  const finalProductPrice = +(
    variant.compare_at_price * currency.currencyRate
  ).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log("category variant", variant);
  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link
            to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
            <img className="default-img" src={variant.images[0].src} alt="" />
            {variant.images.length > 1 ? (
              <img className="hover-img" src={variant.images[1].src} alt="" />
            ) : (
              ""
            )}
          </Link>
          {/* {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )} */}

          <div className="product-action">
            {/* <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}>
                <i className="pe-7s-like" />
              </button>
            </div> */}
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank">
                  {" "}
                  Buy now{" "}
                </a>
              ) : product.variants && product.variants.length >= 1 ? (
                <Link
                  to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
                  Select Option
                </Link>
              ) : variant.sizes.find((size) => size.inventory > 0)?.inventory >
                0 ? (
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        variant: variant,
                        quantity: 1,
                        size: variant.sizes.find((size) => size.inventory > 0)
                          .sizeOption,
                        currentUser,
                      }),
                    )
                  }
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }>
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button title="Quick View" onClick={() => setModalShow(true)}>
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link
              to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
              {product.title}
            </Link>
          </h3>
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + finalProductPrice}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + finalProductPrice} </span>
            )}
          </div>
        </div>
      </div>
      {/* product modal */}
      {/* <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        variant={variant}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      /> */}
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingle;
