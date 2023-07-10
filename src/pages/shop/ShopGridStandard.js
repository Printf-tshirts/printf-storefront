import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { fetchProductsByCategory } from "../../store/actions/product-actions";
import { Loader } from "../../components/loader";

const ShopGridStandard = () => {
  const products = useSelector((state) => state.product.categoryProducts);
  const productsCount = useSelector((state) => state.product.productsCount);
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 12;
  let { categoryHandle } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setFilterLoading(true);
    dispatch(
      fetchProductsByCategory({
        categoryHandle: categoryHandle,
        skip: 0,
        limit: pageLimit,
      }),
    ).then(() => {
      setIsLoading(false);
      setFilterLoading(false);
    });
  }, [categoryHandle, dispatch]);
  let { pathname } = useLocation();

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    // if (!sortType && !filterSortType) {
    //   return;
    // }
    setIsLoading(true);
    setFilterLoading(true);
    let payload = {
      skip: currentPage * pageLimit - pageLimit,
      limit: pageLimit,
    };
    if (sortType) {
      payload[sortType] = sortValue;
      if (sortType === "category") {
        payload.categoryHandle = sortValue.handle;
      }
    } else {
      if (filterSortValue === "priceHighToLow") {
        payload.priceSort = -1;
      } else {
        payload.priceSort = 1;
      }
    }
    dispatch(fetchProductsByCategory(payload)).then(() => {
      setFilterLoading(false);
      setIsLoading(false);
    });
  }, [
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    dispatch,
    currentPage,
    pageLimit,
  ]);

  return (
    <Fragment>
      <SEO
        title={categoryHandle}
        description="Shop page of flone react minimalist eCommerce template."
      />

      <LayoutOne>
        {/* breadcrumb */}
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <Breadcrumb
              pages={[
                { label: "Home", path: process.env.PUBLIC_URL + "/" },
                {
                  label: categoryHandle,
                  path: process.env.PUBLIC_URL + pathname,
                },
              ]}
            />

            <div className="shop-area pt-95 pb-100">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 order-2 order-lg-1">
                    {/* shop sidebar */}
                    <ShopSidebar
                      categoryHandle={categoryHandle}
                      getSortParams={getSortParams}
                      sideSpaceClass="mr-30"
                    />
                  </div>
                  <div className="col-lg-9 order-1 order-lg-2">
                    {/* shop topbar default */}
                    <ShopTopbar
                      getLayout={getLayout}
                      getFilterSortParams={getFilterSortParams}
                      productCount={productsCount}
                      sortedProductCount={
                        (currentPage - 1) * pageLimit + products.length
                      }
                    />

                    {/* shop page content default */}
                    {!filterLoading && (
                      <ShopProducts layout={layout} products={products} />
                    )}

                    {/* shop product pagination */}
                    <div className="pro-pagination-style text-center mt-30">
                      <Paginator
                        totalRecords={productsCount}
                        pageLimit={pageLimit}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageContainerClass="mb-0 mt-0"
                        pagePrevText="«"
                        pageNextText="»"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;
