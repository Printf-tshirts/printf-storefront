import PropTypes from "prop-types";
import clsx from "clsx";
// import ShopSearch from "../../components/product/ShopSearch";
// import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";
import { useState } from "react";
import { useEffect } from "react";
import { getAllColorsAPI } from "../../apis/master.api";
import { getTagsFromCategoryAPI } from "../../apis/products.api";

const ShopSidebar = ({ getSortParams, sideSpaceClass, categoryHandle }) => {
  // const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const fetchParams = async () => {
    getAllColorsAPI().then((res) => {
      setUniqueColors(res.data.colors);
    });
    getTagsFromCategoryAPI({ categoryHandle }).then((res) => {
      setUniqueTags(res.data.tags);
    });
    setUniqueSizes(["XS", "S", "M", "L", "XL", "XXL"]);
  };

  useEffect(() => {
    fetchParams();
  }, []);
  return (
    <div className={clsx("sidebar-style", sideSpaceClass)}>
      {/* shop search */}
      {/* <ShopSearch /> */}

      {/* filter by categories */}
      {/* <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      /> */}

      {/* filter by color */}
      <ShopColor colors={uniqueColors} getSortParams={getSortParams} />

      {/* filter by size */}
      <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} />

      {/* filter by tag */}
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
