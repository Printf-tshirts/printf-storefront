import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const ProductGridSingleTwo = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
  colorClass,
  titlePriceClass,
}) => {
  const variant = product.variants[0];
  const discountedPrice = variant.price;
  const finalProductPrice = +(
    variant.compare_at_price * currency.currencyRate
  ).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);

  return (
    <Fragment>
      <div className={clsx("product-wrap-2", spaceBottomClass, colorClass)}>
        <div className="product-img">
          <Link
            to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
            <img className="default-img" src={product.images[0].src} alt="" />
            <img className="hover-img" src={variant.images[0].src} alt="" />
          </Link>
          {finalProductPrice !== finalDiscountedPrice || product.new ? (
            <div className="product-img-badges">
              {finalProductPrice !== finalDiscountedPrice ? (
                <span className="pink">
                  -
                  {Math.round(
                    ((finalProductPrice - finalDiscountedPrice) * 100) /
                      finalProductPrice,
                  )}
                  %
                </span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}

          {/* <div className="product-action-2">
            {product.affiliateLink ? (
              <a
                href={product.affiliateLink}
                rel="noopener noreferrer"
                target="_blank"
                title="Buy now">
                <i className="pe-7s-cart"></i>
              </a>
            ) : product.variation && product.variation.length >= 1 ? (
              <Link
                to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                title="Select option">
                <i className="pe-7s-cart"></i>
              </Link>
            ) : product.stock && product.stock > 0 ? (
              <button
                onClick={() => dispatch(addToCart(product))}
                className={
                  cartItem !== undefined && cartItem.quantity > 0
                    ? "active"
                    : ""
                }
                disabled={cartItem !== undefined && cartItem.quantity > 0}
                title={
                  cartItem !== undefined ? "Added to cart" : "Add to cart"
                }>
                <i className="pe-7s-cart"></i>
              </button>
            ) : (
              <button disabled className="active" title="Out of stock">
                <i className="pe-7s-cart"></i>
              </button>
            )}
          </div> */}
        </div>
        <div className="product-content-2">
          <div
            className={`title-price-wrap-2 ${
              titlePriceClass ? titlePriceClass : ""
            }`}>
            <h3>
              <Link
                to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
                {product.title}
              </Link>
            </h3>
            <div className="price-2">
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
          {/* <div className="pro-wishlist-2">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}>
              <i className="fa fa-heart-o" />
            </button>
          </div> */}
        </div>
      </div>
      {/* product modal */}
      {/* <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
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

ProductGridSingleTwo.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
};

export default ProductGridSingleTwo;
