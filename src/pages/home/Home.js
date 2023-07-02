import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import BannerEleven from "../../wrappers/banner/BannerEleven";
import CountDownThree from "../../wrappers/countdown/CountDownThree";
import VideoPopup from "../../components/video-popup/VideoPopup";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import NewProductGrid from "../../wrappers/product/NewProductGrid";

const Home = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1">
        {/* hero slider */}
        <HeroSliderTen />
        {/* feature text */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />
        {/* video popup */}
        <VideoPopup spaceBottomClass="pb-100" />
        {/* product slider */}
        <NewProductGrid categoryHandle="tshirts" limit={10} />
        {/* <ProductSliderFour categoryHandle="tshirts" /> */}
        {/* banner */}
        <BannerEleven />
        {/* countdown */}
        <CountDownThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          dateTime="November 13, 2023 12:12:00"
          countDownImage="/assets/img/banner/deal-2.png"
        />
        {/* product slider */}
        {/* <ProductSliderThree categoryHandle="tshirts" /> */}
        {/* brand logo slider */}
        {/* <BrandLogoSliderThree spaceBottomClass="pb-95" spaceTopClass="pt-100" /> */}
        {/* newsletter */}
        {/* <NewsletterFour
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          subscribeBtnClass="hover-red"
          bgColorClass="bg-gray-7"
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
