import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../../components/swiper";
import ProductGridSingleEight from "../../components/product/ProductGridSingleEight";
import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../../store/actions/product-actions";

const settings = {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
};

const ProductGridEight = ({
  categoryHandle,
  type,
  limit,
  spaceBottomClass,
  colorClass,
}) => {
  const products = useSelector((state) => state.product.categoryProducts);
  const currency = useSelector((state) => state.currency);
  // const { cartItems } = useSelector((state) => state.cart);
  // const { wishlistItems } = useSelector((state) => state.wishlist);
  // const { compareItems } = useSelector((state) => state.compare);
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
    <Swiper options={settings}>
      {!isLoading && (
        <>
          {products.map((product) => {
            return (
              <SwiperSlide key={product._id}>
                <ProductGridSingleEight
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
              </SwiperSlide>
            );
          })}
        </>
      )}
    </Swiper>
  );
};

ProductGridEight.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridEight;
