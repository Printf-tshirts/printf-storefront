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

export const Return = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        title="Return Policy"
        description="Return Policy page of printcoder.com"
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Return Policy",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="container my-5">
          <div className="d-flex align-items-center justify-content-center w-100">
            <h1>Return Policy</h1>
          </div>
          <div>
            <p>
              Thank you for shopping at Printcoder. We strive to ensure that you
              are satisfied with your purchase. Please read our return policy
              carefully before making a purchase.
            </p>

            <h2>1. Return Policy Overview</h2>
            <p>
              We have a strict no-return policy. Once an order is placed and the
              payment is processed, it cannot be returned for a refund.
            </p>

            <h2>2. Replacement Policy</h2>
            <p>
              In special cases, we may offer replacements for the following
              situations:
            </p>
            <ul>
              <li>
                Size Issues: If you receive a product with an incorrect size, we
                may offer a replacement for the same design in the correct size.
                Please refer to our size guide before placing an order.
              </li>
              <li>
                Damaged Product: If your product arrives damaged, please contact
                our customer support within 2 days of receiving the order. We
                may request photographic evidence of the damage. Upon
                verification, we will offer a replacement for the same design.
              </li>
              <li>
                The Product should not have been used, washed, or dirty. The
                product must also be in its original undamaged packaging with
                all tags attached.
              </li>
            </ul>
            <h2>3. Process for Replacements</h2>
            <p>
              If you believe you are eligible for a replacement, please follow
              these steps:
            </p>
            <ol>
              <li>
                Contact our customer support within 2 days of receiving the
                order to request a replacement.
              </li>
              <li>
                Provide your order number, detailed information about the issue,
                and any supporting documentation (such as photographs) as
                requested by our customer support team.
              </li>
              <li>
                Once your request is reviewed and approved, we will provide
                instructions on how to return the damaged or incorrect product
                (if applicable).
              </li>
              <li>
                Upon receiving the returned product, we will process the
                replacement and ship the new product to you. Please note that
                the replacement will be for the same design and size.
              </li>
            </ol>

            <h2>4. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding our return and
              replacement policy, please contact our customer support at email:{" "}
              <a href="mailto:contact@printcoder.com">contact@printcoder.com</a>
            </p>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
