import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { useEffect } from "react";
import { Modal, Table } from "antd";

const ProductDescriptionInfo = ({
  product,
  variant,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  items,
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
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const sizeGuide = [
    {
      id: 1,
      name: "XS",
      chest: "36",
      length: "26.5",
      sleeve: "7.75",
    },
    {
      id: 2,
      name: "S",
      chest: "38",
      length: "27.25",
      sleeve: "8",
    },
    {
      id: 3,
      name: "M",
      chest: "40",
      length: "28",
      sleeve: "8.25",
    },
    {
      id: 4,
      name: "L",
      chest: "42",
      length: "28.75",
      sleeve: "8.5",
    },
    {
      id: 5,
      name: "XL",
      chest: "44",
      length: "29.5",
      sleeve: "8.75",
    },
    {
      id: 6,
      name: "2XL",
      chest: "46",
      length: "30.25",
      sleeve: "9",
    },
  ];
  const sizeGuideColumns = [
    {
      title: "Size",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chest",
      dataIndex: "chest",
      key: "chest",
    },
    {
      title: "Length",
      dataIndex: "length",
      key: "length",
    },
    {
      title: "Sleeve",
      dataIndex: "sleeve",
      key: "sleeve",
    },
  ];
  useEffect(() => {
    setProductStock(
      variant.sizes.find((size) => size.sizeOption === selectedProductSize)
        ?.inventory || 0,
    );
  }, [selectedProductSize, variant.sizes]);
  const productCartQty = getProductCartQuantity(
    items,
    product,
    selectedProductColor,
    selectedProductSize,
  );
  const handleSizeGuide = () => {
    setOpenSizeGuide(!openSizeGuide);
  };

  return (
    <>
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
            <span>{currency.currencySymbol + finalDiscountedPrice} </span>
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
              <div className="d-flex justify-content-between">
                <span>Size</span>
                <div
                  className="default-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleSizeGuide();
                  }}>
                  <strong>Size Guide</strong>
                </div>
              </div>
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
        <div>
          <div className="d-flex align-items-center my-3">
            <img width={"30"} src="/assets/custom/fast-delivery.png" alt="" />
            <p className="mx-3 bold-text">Get it by Mon, Jul 17</p>
          </div>
          <div className="my-3">
            <p className="bold-text">BEST OFFERS </p>
            <p>Best Price: Rs. 503</p>
            <ul>
              <li>Coupon Discount: 10% off (Your total saving: Rs. 1495)</li>
              <li>Applicable on: Orders above Rs. 1499</li>
              <li>Coupon code: MFC10</li>
            </ul>
          </div>
        </div>
        <hr />
        <div>
          <div className="my-3">
            <p className="bold-text">PRODUCT DETAILS </p>
            <ul>
              <li>Grey and white Tshirt for men</li>
              <li>Graphic printed</li>
              <li>Regular length</li>
              <li>Round neck</li>
              <li>Short, regular sleeves</li>
              <li>Knitted cotton fabric</li>
            </ul>
          </div>
          <div className="my-3">
            <p className="bold-text">Size & Fit </p>
            <ul>
              <li>Regular Fit</li>
              <li>The model (height 6') is wearing a size M</li>
            </ul>
          </div>
          <div className="my-3">
            <p className="bold-text">Material & Care</p>
            <ul>
              <li>52%Cotton 48%Polyester</li>
              <li>Machine Wash</li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        open={openSizeGuide}
        footer={null}
        title="Size Guide"
        onOk={handleSizeGuide}
        onCancel={handleSizeGuide}>
        <div className="d-flex justify-content-center">
          <img
            src="https://images.bewakoof.com/sizeguide/men-half-sleeves-tshirts-1484025744-1623075051.jpg"
            width={"300"}
            alt=""
          />
        </div>
        <Table
          responsive
          pagination={false}
          columns={sizeGuideColumns}
          dataSource={sizeGuide}
        />
      </Modal>
    </>
  );
};

ProductDescriptionInfo.propTypes = {
  items: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
