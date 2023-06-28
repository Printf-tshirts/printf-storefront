import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import BannerOne from "../../wrappers/banner/BannerOne";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

export const Privacy = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Privacy Policy"
        description="Privacy Policy page of flone react minimalist eCommerce template."
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Privacy Policy",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="container my-5">
          <div className="d-flex align-items-center justify-content-center w-100">
            <h1>Privacy Policy</h1>
          </div>
          <div class="rte">
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            www.ragecoffee.com (the “Site”).
            <br />
            <h2></h2>
            <h2>PERSONAL INFORMATION WE COLLECT</h2>
            When you visit the Site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. We refer to
            this automatically-collected information as “Device Information”.
            <br />
            <br />
            We collect Device Information using the following technologies:
            <br />- “Cookies” are data files that are placed on your device or
            computer and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit
            http://www.allaboutcookies.org.
            <br />- “Log files” track actions occurring on the Site, and collect
            data including your IP address, browser type, Internet service
            provider, referring/exit pages, and date/time stamps.
            <br />- “Web beacons”, “tags”, and “pixels” are electronic files
            used to record information about how you browse the Site.
            <br />
            <br />
            Additionally when you make a purchase or attempt to make a purchase
            through the Site, we collect certain information from you, including
            your name, billing address, shipping address, payment information,
            email address, and phone number. We refer to this information as
            “Order Information”.
            <br />
            <br />
            When we talk about “Personal Information” in this Privacy Policy, we
            are talking both about Device Information and Order Information.
            <br />
            <h2></h2>
            <h2>HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
            We use the Order Information that we collect generally to fulfill
            any orders placed through the Site (including processing your
            payment information, arranging for shipping, and providing you with
            invoices and/or order confirmations). Additionally, we use this
            Order Information to:
            <br />- Communicate with you;
            <br />- Screen our orders for potential risk or fraud; and
            <br />- When in line with the preferences you have shared with us,
            provide you with information or advertising relating to our products
            or services.
            <br />
            <br />
            We use the Device Information that we collect to help us screen for
            potential risk and fraud (in particular, your IP address), and more
            generally to improve and optimize our Site (for example, by
            generating analytics about how our customers browse and interact
            with the Site, and to assess the success of our marketing and
            advertising campaigns).
            <br />
            <h3></h3>
            <h3>DO NOT TRACK</h3>
            Please note that we do not alter our Site’s data collection and use
            practices when we see a Do Not Track signal from your browser.
            <br />
            <h3></h3>
            <h3>CHANGES</h3>
            We may update this privacy policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal or regulatory reasons.
            <br />
            <h3></h3>
            <h3>CONTACT US</h3>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e‑mail at&nbsp;help@ragecoffee.com or by mail using the
            details provided below:
            <br />
            <br />
            [Re: Privacy<span>&nbsp;</span>
            <em>Compliance</em>
            <span>&nbsp;</span>Officer]<span>&nbsp;</span>
            <br />
            SWMABHAN COMMERCE PRIVATE LIMITED
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
