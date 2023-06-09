import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  product,
  variant,
}) => {
  const currency = useSelector((state) => state.currency);
  const { items } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const discountedPrice = variant.compare_at_price
    ? variant.compare_at_price - variant.price
    : null;
  const finalProductPrice = +(
    variant.compare_at_price * currency.currencyRate
  ).toFixed(2);
  const finalDiscountedPrice = +(variant.price * currency.currencyRate).toFixed(
    2,
  );

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}

            <ProductImageGallery
              product={{
                ...variant,
                images: [...variant?.images, ...product?.images],
              }}
            />
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              variant={variant}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              items={items}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
