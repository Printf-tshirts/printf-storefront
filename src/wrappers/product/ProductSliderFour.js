import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";
import ProductGridNine from "./ProductGridNine";

const ProductSliderFour = ({ spaceBottomClass, categoryHandle }) => {
  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitleSeven
          titleText="New Products"
          subtitleText="Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          spaceClass="mb-55"
          borderClass="no-border"
          positionClass="text-center"
        />
        <div className="row">
          <ProductGridNine
            categoryHandle={categoryHandle}
            limit={6}
            type="new"
          />
        </div>
      </div>
    </div>
  );
};

ProductSliderFour.propTypes = {
  categoryHandle: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductSliderFour;
