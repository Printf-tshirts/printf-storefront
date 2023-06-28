import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { useEffect } from "react";

const ProductDescriptionInfo = ({
  product,
  variant,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  currentUser,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedProductColor, setSelectedProductColor] = useState(
    variant.color._id,
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    variant.sizes.find((sizeOption) => sizeOption.inventory > 0)?.sizeOption ||
      "XS",
  );
  const [productStock, setProductStock] = useState(0);

  const [quantityCount, setQuantityCount] = useState(1);

  useEffect(() => {
    setProductStock(
      variant.sizes.find((size) => size.sizeOption === selectedProductSize)
        ?.inventory || 0,
    );
  }, [selectedProductSize, variant.sizes]);
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize,
  );

  return (
    <div className="product-details-content ml-70">
      <h2>{product.title}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <div>
            <div>
              <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            </div>
            <div className="my-1">
              <span className="old">MRP: </span>
              <span className="old cut">
                {currency.currencySymbol + finalProductPrice}
              </span>
              <span className="tax">(inclusive of all taxes)</span>
            </div>
          </div>
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
        <p>{product.body_html}</p>
      </div>

      {product.variants ? (
        <div className="pro-details-size-color d-flex flex-column">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variants.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color.name.toLowerCase()}`}
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
                        setSelectedProductSize(single.sizes[0].sizeOption);
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
                          <>
                            {singleSize.inventory >= 1 ? (
                              <>
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
                              </>
                            ) : (
                              <>
                                <label
                                  className={`pro-details-size-content--single--disabled`}
                                  key={key}>
                                  <span className="size-name">
                                    <span className="size-buttons-size-strike-show "></span>
                                    {singleSize.sizeOption}
                                  </span>
                                </label>
                              </>
                            )}
                          </>
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
          <div className="pro-details-cart btn-hover ml-0">
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
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
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
              onClick={() => dispatch(addToWishlist(product))}
            >
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
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div> */}
        </div>
      )}
      {product.categories ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.categories.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={"/" + single.handle}>{single.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tags ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tags.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={`/search/${single}`}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
