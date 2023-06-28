import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from "swiper";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRating";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../store/slices/cart-slice";
import { useNavigate } from "react-router-dom";

function ProductModal({
  product,
  variant,
  currency,
  discountedPrice,
  finalProductPrice,
  finalDiscountedPrice,
  show,
  onHide,
  wishlistItem,
  compareItem,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variants ? product.variants[0].color._id : "",
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variants ? product.variants[0].sizes[0].sizeOption : "",
  );
  const [productStock, setProductStock] = useState(
    product.variants ? product.variants[0].sizes[0].inventory : 0,
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize,
  );

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true,
  };

  const onCloseModal = () => {
    setThumbsSwiper(null);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper">
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="product-large-image-wrapper">
              <Swiper options={gallerySwiperParams}>
                {variant.images &&
                  variant.images.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image">
                          <img
                            src={img.src}
                            className="img-fluid"
                            alt="Product"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div className="product-small-image-wrapper mt-15">
              <Swiper options={thumbnailSwiperParams}>
                {variant.images &&
                  variant.images.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image">
                          <img src={img.src} className="img-fluid" alt="" />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 col-xs-12">
            <div className="product-details-content quickview-content">
              <h2>{product.name}</h2>
              <div className="product-details-price">
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
                  <span>{currency.currencySymbol + finalProductPrice} </span>
                )}
              </div>
              {product.rating && product.rating > 0 ? (
                <div className="pro-details-rating-wrap">
                  <div className="pro-details-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="pro-details-list">
                <p>{product.shortDescription}</p>
              </div>

              {product.variants ? (
                <div className="pro-details-size-color">
                  <div className="pro-details-color-wrap">
                    <span>Color</span>
                    <div className="pro-details-color-content">
                      {product.variants.map((single, key) => {
                        return (
                          <label
                            className={`pro-details-color-content--single ${single.color}`}
                            key={key}>
                            <input
                              type="radio"
                              value={single.color._id}
                              name="product-color"
                              checked={
                                single.color._id === selectedProductColor
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductColor(single.color._id);
                                navigate(
                                  `/${single.categories[0].handle}/${single.handle}/${single.product_code}`,
                                );
                                setSelectedProductSize(
                                  single.sizes[0].sizeOption,
                                );
                                setProductStock(single.sizes[0].inventory);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pro-details-size">
                    <span>Size</span>
                    <div className="pro-details-size-content">
                      {product.variants &&
                        product.variants.map((single) => {
                          return single.color._id === selectedProductColor
                            ? single.sizes.map((singleSize, key) => {
                                return (
                                  <label
                                    className={`pro-details-size-content--single`}
                                    key={key}>
                                    <input
                                      type="radio"
                                      value={singleSize.sizeOption}
                                      checked={
                                        singleSize.sizeOption ===
                                        selectedProductSize
                                          ? "checked"
                                          : ""
                                      }
                                      onChange={() => {
                                        setSelectedProductSize(
                                          singleSize.sizeOption,
                                        );
                                        setProductStock(singleSize.inventory);
                                        setQuantityCount(1);
                                      }}
                                    />
                                    <span className="size-name">
                                      {singleSize.sizeOption}
                                    </span>
                                  </label>
                                );
                              })
                            : "";
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {product.affiliateLink ? (
                <div className="pro-details-quality">
                  <div className="pro-details-cart btn-hover">
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank">
                      Buy Now
                    </a>
                  </div>
                </div>
              ) : (
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1,
                        )
                      }
                      className="dec qtybutton">
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={quantityCount}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount < productStock - productCartQty
                            ? quantityCount + 1
                            : quantityCount,
                        )
                      }
                      className="inc qtybutton">
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    {productStock && productStock > 0 ? (
                      <button
                        onClick={() =>
                          dispatch(
                            addToCart({
                              variant: variant,
                              quantity: quantityCount,
                              size: selectedProductSize,
                              currentUser,
                            }),
                          )
                        }
                        disabled={productCartQty >= productStock}>
                        {" "}
                        Add To Cart{" "}
                      </button>
                    ) : (
                      <button disabled>Out of Stock</button>
                    )}
                  </div>
                  {/* <div className="pro-details-wishlist">
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
                  </div>
                  <div className="pro-details-compare">
                    <button
                      className={compareItem !== undefined ? "active" : ""}
                      disabled={compareItem !== undefined}
                      title={
                        compareItem !== undefined
                          ? "Added to compare"
                          : "Add to compare"
                      }
                      onClick={() => dispatch(addToCompare(product))}>
                      <i className="pe-7s-shuffle" />
                    </button>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ProductModal.propTypes = {
  currency: PropTypes.shape({}),
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.shape({}),
  show: PropTypes.bool,
  wishlistItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
};

export default ProductModal;
