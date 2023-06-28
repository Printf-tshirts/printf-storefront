import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../components/swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../../store/actions/product-actions";
import { Loader } from "../../components/loader";

const settings = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
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

const RelatedProductSlider = ({ spaceBottomClass, category }) => {
  const prods = useSelector((state) => state.product.categoryProducts);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchProductsByCategory({ categoryId: category._id })).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, category._id]);

  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitle
          titleText="Related Products"
          positionClass="text-center"
          spaceClass="mb-50"
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {prods?.length ? (
              <Swiper options={settings}>
                {prods.map((product) => (
                  <SwiperSlide key={product._id}>
                    <ProductGridSingle
                      product={product}
                      variant={product.variants[0]}
                      currency={currency}
                      cartItem={cartItems.find(
                        (cartItem) => cartItem.id === product.id,
                      )}
                      // wishlistItem={wishlistItems.find(
                      //   (wishlistItem) => wishlistItem.id === product.id,
                      // )}
                      // compareItem={compareItems.find(
                      //   (compareItem) => compareItem.id === product.id,
                      // )}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default RelatedProductSlider;
