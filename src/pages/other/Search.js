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
import {
  fetchProductsByCategory,
  fetchProductsBySearch,
} from "../../store/actions/product-actions";
import { Loader } from "../../components/loader";

const Search = () => {
  const products = useSelector((state) => state.product.searchProducts);
  const productsCount = useSelector((state) => state.product.productsCount);
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialProducts, setInitialProducts] = useState([]);
  const pageLimit = 12;
  let { query } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setFilterLoading(true);
    dispatch(
      fetchProductsBySearch({
        query,
        skip: (currentPage - 1) * pageLimit,
        limit: pageLimit,
      }),
    ).then(() => {
      setIsLoading(false);
      setFilterLoading(false);
    });
  }, [query, currentPage, pageLimit, dispatch]);
  useEffect(() => {
    if (initialProducts.length === 0) {
      setInitialProducts(products);
    }
  }, [products, initialProducts]);
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
    if (!sortType && !filterSortType) {
      return;
    }
    setFilterLoading(true);
    let payload = {};
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
    dispatch(
      fetchProductsBySearch({
        query,
        skip: (currentPage - 1) * pageLimit,
        limit: pageLimit,
      }),
    ).then(() => {
      setFilterLoading(false);
    });
  }, [
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    currentPage,
    pageLimit,
    dispatch,
    query,
  ]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
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
                  label: `Search: ${query}`,
                  path: process.env.PUBLIC_URL + pathname,
                },
              ]}
            />

            <div className="shop-area pt-95 pb-100">
              <div className="container">
                <div className="row">
                  {/* <div className="col-lg-3 order-2 order-lg-1">
                    <ShopSidebar
                      products={initialProducts}
                      getSortParams={getSortParams}
                      sideSpaceClass="mr-30"
                    />
                  </div> */}
                  <div className="col-lg-12 order-1 order-lg-2">
                    {/* shop topbar default */}
                    <ShopTopbar
                      getLayout={getLayout}
                      getFilterSortParams={getFilterSortParams}
                      productCount={products.length}
                      sortedProductCount={productsCount}
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

export default Search;
