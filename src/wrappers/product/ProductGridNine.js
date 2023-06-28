import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../../components/swiper";
import ProductGridSingleNine from "../../components/product/ProductGridSingleNine";
import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../../store/actions/product-actions";

const settings = {
  loop: false,
  slidesPerView: 4,
  spaceBetween: 30,
  grabCursor: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
};

const ProductGridNine = ({
  spaceBottomClass,
  colorClass,
  categoryHandle,
  type,
  limit,
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
                <ProductGridSingleNine
                  spaceBottomClass={spaceBottomClass}
                  colorClass={colorClass}
                  product={product}
                  currency={currency}
                  // cartItem={cartItems.find(
                  //   (cartItem) => cartItem.id === product._id,
                  // )}
                  // wishlistItem={wishlistItems.find(
                  //   (wishlistItem) => wishlistItem.id === product._id,
                  // )}
                  // compareItem={compareItems.find(
                  //   (compareItem) => compareItem.id === product._id,
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

ProductGridNine.propTypes = {
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridNine;
