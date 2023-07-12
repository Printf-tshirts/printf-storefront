import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import BannerEleven from "../../wrappers/banner/BannerEleven";
import BannerThirty from "../../wrappers/banner/BannerThirty";
import CountDownThree from "../../wrappers/countdown/CountDownThree";
import VideoPopup from "../../components/video-popup/VideoPopup";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import NewProductGrid from "../../wrappers/product/NewProductGrid";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";

const Home = () => {
  return (
    <Fragment>
      <SEO
        title={"Printcoder: Where Style Meets Expression!"}
        description="Welcome to Printcoder - Your Destination for Trendy Design Printed T-Shirts! Express your passion for travel, food, humor, engineering, and more with our unique collection. Shop now for high-quality, stylish tees that reflect your personality. Get noticed with our eye-catching designs and make a statement with Printcoder! Free shipping on orders over ₹999. Join our fashion revolution today!"
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1">
        {/* hero slider */}
        <HeroSliderTen />
        {/* feature text */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />
        {/* video popup */}
        {/* <VideoPopup spaceBottomClass="pb-100" /> */}
        {/* product slider */}
        <NewProductGrid categoryHandle="tshirts" limit={10} />
        {/* <ProductSliderFour categoryHandle="tshirts" /> */}
        {/* banner */}
        <BannerEleven />
        {/* countdown */}
        {/* <CountDownThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          dateTime="November 13, 2023 12:12:00"
          countDownImage="/assets/img/banner/deal-2.jpg"
        /> */}
        {/* banner */}
        <BannerThirty spaceTopClass="pt-100" spaceBottomClass="pb-70" />
        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
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
