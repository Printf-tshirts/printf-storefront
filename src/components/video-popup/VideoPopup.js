import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";

const VideoPopup = ({ spaceBottomClass }) => {
  const [modalStatus, isOpen] = useState(false);
  return (
    <div className={clsx("video-popup", spaceBottomClass)}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="video-popup__image">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/img/banner/video-thumbnail.png"
                }
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="video-popup__content">
              <h2 className="title mb-30">
                Printcoder: Where Style Meets Expression!
              </h2>
              <p className="text mb-30">
                Your Destination for Trendy Design Printed T-Shirts! Express
                your passion for travel, food, humor, engineering, and more with
                our unique collection. Shop now for high-quality, stylish tees
                that reflect your personality. Get noticed with our eye-catching
                designs and make a statement with Printcoder! Free shipping on
                orders over ₹999. Join our fashion revolution today!
              </p>
              <div className="link mb-30">
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  More About Us
                </Link>
              </div>
              <ModalVideo
                channel="youtube"
                isOpen={modalStatus}
                // videoId="feOScd2HdiU"
                onClose={() => isOpen(false)}
              />
              <button onClick={() => isOpen(true)}>
                <i className="fa fa-play-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoPopup.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default VideoPopup;
