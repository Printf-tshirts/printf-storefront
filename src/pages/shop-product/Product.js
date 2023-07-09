import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { fetchProductByVariantHandle } from "../../store/actions/product-actions";
import { Loader } from "../../components/loader";
import { setSelectedVariant } from "../../store/slices/product-slice";

const Product = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  let { categoryHandle, variantHandle, productCode } = useParams();
  const product = useSelector((state) => state.product.product);
  const selectedVariant = useSelector((state) => state.product.selectedVariant);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      fetchProductByVariantHandle({
        variantHandle,
        categoryHandle,
        productCode,
      }),
    ).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, variantHandle, categoryHandle, productCode]);

  useEffect(() => {
    console.log("product", product);
    if (product && product.title) {
      product.variants.forEach((variant) => {
        if (variant.handle === variantHandle) {
          dispatch(setSelectedVariant(variant));
        }
      });
    } else {
      if (isLoading === false) {
        dispatch(setSelectedVariant(null));
        navigate("/404");
      }
    }
  }, [dispatch, product, variantHandle, isLoading, navigate]);

  return (
    <Fragment>
      <SEO
        title={selectedVariant?.title}
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="hidden">
        {/* render the loader conditionally */}
        {isLoading && <Loader />}
        {/* breadcrumb */}
        {!isLoading && !product.handle && navigate("/404")}
        {!isLoading && product && (
          <Breadcrumb
            pages={[
              { label: "Home", path: process.env.PUBLIC_URL + "/" },
              {
                label: categoryHandle,
                path: `/${categoryHandle}`,
              },
              {
                label: product.title,
                path: process.env.PUBLIC_URL + pathname,
              },
            ]}
          />
        )}

        {/* product description with image */}
        {!isLoading && product && (
          <ProductImageDescription
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            product={product}
            variant={selectedVariant}
          />
        )}

        {/* product description tab */}
        {!isLoading && product && (
          <ProductDescriptionTab
            spaceBottomClass="pb-90"
            productFullDesc={product.body_html}
          />
        )}

        {/* related product slider */}
        {!isLoading && product && (
          <RelatedProductSlider
            spaceBottomClass="pb-95"
            category={product.categories[0]}
          />
        )}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
