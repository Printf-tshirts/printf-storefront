import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";

const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const variant = product.variants[0];
  const discountedPrice = variant.compare_at_price
    ? variant.compare_at_price - variant.price
    : null;
  const finalProductPrice = +(
    variant.compare_at_price * currency.currencyRate
  ).toFixed(2);
  const finalDiscountedPrice = +(variant.price * currency.currencyRate).toFixed(
    2,
  );
  const dispatch = useDispatch();

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
              ) : product.variation && product.variation.length >= 1 ? (
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
                  // className={
                  //   cartItem !== undefined && cartItem.quantity > 0
                  //     ? "active"
                  //     : ""
                  // }
                  // disabled={cartItem !== undefined && cartItem.quantity > 0}
                  // title={
                  //   cartItem !== undefined ? "Added to cart" : "Add to cart"
                  // }
                  title={"Added to cart"}>
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {/* {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"} */}
                  Add to cart
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
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
              <span>{currency.currencySymbol + finalDiscountedPrice} </span>
            )}
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link
                  to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
                  <img
                    className="default-img img-fluid"
                    src={variant.images[0].src}
                    alt=""
                  />
                  {variant.images.length > 1 ? (
                    <img
                      className="hover-img img-fluid"
                      src={variant.images[1].src}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </Link>
                {product.discount || product.new ? (
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
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link
                  to={`/${product.categories[0].handle}/${variant.handle}/${variant.product_code}`}>
                  {product.title}
                </Link>
              </h3>
              <div className="product-list-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {currency.currencySymbol + finalDiscountedPrice}
                    </span>{" "}
                    <span className="old">
                      {currency.currencySymbol + finalProductPrice}
                    </span>
                  </Fragment>
                ) : (
                  <span>{currency.currencySymbol + finalDiscountedPrice} </span>
                )}
              </div>
              {product.rating && product.rating > 0 ? (
                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              {product.body_html ? <p>{product.body_html}</p> : ""}

              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
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
                  ) : variant.sizes.find((size) => size.inventory > 0)
                      ?.inventory > 0 ? (
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            variant: variant,
                            quantity: 1,
                            size: variant.sizes.find(
                              (size) => size.inventory > 0,
                            ).sizeOption,
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

                <div className="shop-list-wishlist ml-10">
                  {/* <button
                    className={wishlistItem !== undefined ? "active" : ""}
                    disabled={wishlistItem !== undefined}
                    title={
                      wishlistItem !== undefined
                        ? "Added to wishlist"
                        : "Add to wishlist"
                    }
                    onClick={() => dispatch(addToWishlist(product))}>
                    <i className="pe-7s-like" />
                  </button> */}
                </div>
                <div className="shop-list-compare ml-10">
                  {/* <button
                    className={compareItem !== undefined ? "active" : ""}
                    disabled={compareItem !== undefined}
                    title={
                      compareItem !== undefined
                        ? "Added to compare"
                        : "Add to compare"
                    }
                    onClick={() => dispatch(addToCompare(product))}>
                    <i className="pe-7s-shuffle" />
                  </button> */}
                </div>
              </div>
            </div>
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

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
