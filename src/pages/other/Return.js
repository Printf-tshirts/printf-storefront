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
        titleTemplate="Return Policy"
        description="Return Policy page of flone react minimalist eCommerce template."
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
            <h1>Privacy Policy</h1>
          </div>
          <div>
            <p>
              This Privacy Policy outlines how Printcoder collects, uses, and
              protects the information you provide when using our website
              (www.printcoder.com). We are committed to respecting your privacy
              and protecting your personal information.
            </p>

            <h2>1. Information Collection</h2>
            <p>
              We may collect the following types of information when you
              interact with our website:
            </p>
            <ul>
              <li>
                Personal Information: This may include your name, email address,
                contact information, and other details you provide when making a
                purchase or contacting us.
              </li>
              <li>
                Usage Information: We may collect data on how you interact with
                our website, including your browsing activities, IP address,
                device information, and referral sources.
              </li>
            </ul>

            <h2>2. Use of Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To process and fulfill your orders</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To improve our website, products, and services</li>
              <li>To send promotional emails and updates with your consent</li>
              <li>
                To enforce our terms and conditions and protect our rights
              </li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. However, we may share your information with trusted
              third-party service providers who assist us in operating our
              website, conducting business operations, or servicing you.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We take appropriate measures to protect the confidentiality,
              integrity, and security of your personal information. However,
              please note that no data transmission over the internet or
              electronic storage method is 100% secure.
            </p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              browsing experience and collect information about your usage
              patterns. You can modify your browser settings to manage cookies
              or opt-out of certain tracking technologies.
            </p>

            <h2>6. Links to Third-Party Websites</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of those
              websites. We encourage you to review the privacy policies of
              third-party websites before providing any personal information.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our website is not intended for individuals under the age of 12.
              We do not knowingly collect personal information from children. If
              you believe we have inadvertently collected information from a
              child, please contact us to request its deletion.
            </p>

            <h2>8. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal
              information. If you wish to exercise these rights or have any
              concerns regarding your information, please contact us using the
              information provided below.
            </p>

            <h2>9. Changes to this Privacy Policy</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at
              any time. Any changes will be effective upon posting the revised
              version on our website.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our privacy practices, please contact us at
              Email:{" "}
              <a href="mailto:contact@printcoder.com">contact@printcoder.com</a>
            </p>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
