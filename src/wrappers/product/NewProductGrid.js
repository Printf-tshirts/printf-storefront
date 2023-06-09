import PropTypes from "prop-types";

import ProductGridTwo from "./ProductGridTwo";
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";

const NewProductGrid = ({ categoryHandle, limit }) => {
  return (
    <div className="product-area pb-60 section-padding-1">
      <div className="container-fluid">
        <SectionTitleTwo
          titleText="Trendy Designs"
          subTitleText="Get noticed with our eye-catching designs and make a statement with Printcoder!"
          positionClass="text-center"
          spaceClass="mb-60"
        />
        <div className="row five-column">
          <ProductGridTwo
            categoryHandle={categoryHandle}
            type="new"
            limit={limit}
            spaceBottomClass="mb-25"
          />
        </div>
      </div>
    </div>
  );
};

NewProductGrid.propTypes = {
  categoryHandle: PropTypes.string,
  limit: PropTypes.number,
};

export default NewProductGrid;
