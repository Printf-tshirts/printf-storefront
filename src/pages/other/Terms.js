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

export const Terms = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Terms & Conditions"
        description="Terms & Conditions page of printcoder.com"
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Terms & Conditions",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="container my-5">
          <div className="d-flex align-items-center justify-content-center w-100">
            <h1>Terms & Conditions</h1>
          </div>
          <div class="rte">
            <p>
              Please read these Terms and Conditions carefully before using our
              website (www.printcoder.com). By accessing or using our website,
              you agree to be bound by these Terms and Conditions. If you do not
              agree with any part of these Terms and Conditions, please do not
              use our website.
            </p>

            <h2>1. Intellectual Property</h2>
            <p>
              The content, logos, designs, and other materials on our website
              are protected by intellectual property laws. You may not use,
              reproduce, distribute, modify, or create derivative works of our
              intellectual property without prior written consent from
              Printcoder.
            </p>

            <h2>2. Product Information</h2>
            <p>
              We strive to provide accurate product descriptions and information
              on our website. However, we do not warrant that the descriptions,
              colors, or other product details on our website are accurate,
              complete, or error-free. Please refer to the actual product for
              the most up-to-date information.
            </p>

            <h2>3. User Conduct</h2>
            <p>
              When using our website, you agree to comply with all applicable
              laws and regulations. You must not engage in any activity that may
              disrupt or interfere with the proper functioning of our website or
              compromise the security of our systems.
            </p>

            <h2>4. Links to Third-Party Websites</h2>
            <p>
              Our website may contain links to third-party websites for your
              convenience. We do not endorse or assume any responsibility for
              the content, privacy practices, or availability of these
              third-party websites. Your use of third-party websites is at your
              own risk.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              Printcoder and its affiliates will not be liable for any direct,
              indirect, incidental, consequential, or punitive damages arising
              out of or related to your use of our website or the products
              purchased through our website.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of Uttar Pradash. Any legal action or
              proceeding arising out of or related to these Terms and Conditions
              shall be brought exclusively in the courts of Uttar Pradash.
            </p>

            <h2>7. Modifications</h2>
            <p>
              We reserve the right to modify or update these Terms and
              Conditions at any time without prior notice. By continuing to use
              our website after any modifications or updates, you agree to be
              bound by the revised Terms and Conditions.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding these Terms and
              Conditions, please contact us at Email:{" "}
              <a href="mailto:contact@printcoder.com">contact@printcoder.com</a>
            </p>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
