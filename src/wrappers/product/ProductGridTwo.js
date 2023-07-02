import { Fragment } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import { useState } from "react";
import { useEffect } from "react";
import { fetchProductsByCategory } from "../../store/actions/product-actions";

const ProductGridTwo = ({
  spaceBottomClass,
  colorClass,
  titlePriceClass,
  categoryHandle,
  type,
  limit,
}) => {
  const products = useSelector((state) => state.product.categoryProducts);
  const currency = useSelector((state) => state.currency);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchProductsByCategory({ categoryHandle: categoryHandle })).then(
      () => {
        setIsLoading(false);
      },
    );
  }, [dispatch, categoryHandle]);

  if (!products?.length) return <p>No products found</p>;
  return (
    <Fragment>
      {!isLoading && (
        <>
          {products?.map((product) => {
            return (
              <div
                className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
                key={product._id}>
                <ProductGridSingleTwo
                  spaceBottomClass={spaceBottomClass}
                  colorClass={colorClass}
                  product={product}
                  currency={currency}
                  // cartItem={cartItems.find(
                  //   (cartItem) => cartItem.id === product.id,
                  // )}
                  // wishlistItem={wishlistItems.find(
                  //   (wishlistItem) => wishlistItem.id === product.id,
                  // )}
                  // compareItem={compareItems.find(
                  //   (compareItem) => compareItem.id === product.id,
                  // )}
                />
              </div>
            );
          })}
        </>
      )}
    </Fragment>
  );
};

ProductGridTwo.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridTwo;
