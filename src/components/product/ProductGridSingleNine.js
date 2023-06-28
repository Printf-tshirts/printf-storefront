import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";

const ProductGridSingleNine = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
  colorClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const variant = product.variants[0];
  const discountedPrice = variant.price;
  const finalProductPrice = +(
    variant.compare_at_price * currency.currencyRate
  ).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={clsx("product-wrap-9", spaceBottomClass, colorClass)}>
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

          <div className="product-action-2">
            {product.affiliateLink ? (
              <a
                href={product.affiliateLink}
                rel="noopener noreferrer"
                target="_blank"
                title="Buy now">
                {" "}
                <i className="fa fa-shopping-cart"></i>{" "}
              </a>
            ) : product.variants && product.variants.length >= 1 ? (
              <Link
                to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}
                title="Select options">
                <i className="fa fa-cog"></i>
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
                <i className="fa fa-shopping-cart"></i>
              </button>
            ) : (
              <button disabled className="active" title="Out of stock">
                <i className="fa fa-shopping-cart"></i>
              </button>
            )}

            <button onClick={() => setModalShow(true)} title="Quick View">
              <i className="fa fa-eye"></i>
            </button>

            {/* <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}>
              <i className="fa fa-retweet"></i>
            </button> */}
          </div>
        </div>
        <div className="product-content-2">
          <div className="title-price-wrap-2">
            <h3>
              <Link
                to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
                {product.title}
              </Link>
            </h3>
            <div className="price-2">
              {discountedPrice !== null ? (
                <Fragment>
                  <span className="old">
                    {currency.currencySymbol + finalProductPrice}
                  </span>{" "}
                  <span>{currency.currencySymbol + finalDiscountedPrice}</span>
                </Fragment>
              ) : (
                <span>{currency.currencySymbol + finalProductPrice} </span>
              )}
            </div>
          </div>
          <div className="pro-wishlist-2">
            {/* <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}>
              <i className="fa fa-heart-o" />
            </button> */}
          </div>
        </div>
      </div>
      {/* product modal */}
      {/* <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        variant={variant}
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

ProductGridSingleNine.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default ProductGridSingleNine;
