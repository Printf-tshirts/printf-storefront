import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map";
import { useSelector } from "react-redux";
import { addContactAPI } from "../../apis/contacts.api";
import cogoToast from "cogo-toast";
import { Form, Input } from "antd";

const Contact = () => {
  let { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const handleBulkOrder = (values) => {
    if (currentUser) {
      values.user = currentUser._id;
    }
    addContactAPI(values)
      .then((res) => {
        cogoToast.success(res.data.message, { position: "top-center" });
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error("Something went wrong!", { position: "top-center" });
      });
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Contact Us"
        description="Contact Us page of printcoder.com"
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Contact Us", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            {/* <div className="contact-map mb-10">
              <GoogleMap lat={47.444} lng={-122.176} />
            </div> */}
            <div className="custom-row-2 align-items-center">
              <div className="col-12 col-lg-12 col-md-12">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <Form
                    onFinish={handleBulkOrder}
                    className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <Form.Item
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                            },
                          ]}>
                          <Input placeholder="Name*" type="text" />
                        </Form.Item>
                      </div>
                      <div className="col-lg-6">
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                          ]}>
                          <Input placeholder="Email*" type="email" />
                        </Form.Item>
                      </div>
                      <div className="col-lg-12">
                        <Form.Item
                          name="number"
                          rules={[
                            {
                              required: true,
                              message: "Please input your number!",
                            },
                          ]}>
                          <Input placeholder="Number*" type="number" />
                        </Form.Item>
                      </div>
                      <div className="col-lg-12">
                        <Form.Item
                          name="message"
                          rules={[
                            {
                              required: true,
                              message: "Please input your message!",
                            },
                          ]}>
                          <Input.TextArea
                            placeholder="Your Message*"
                            defaultValue={""}
                          />
                        </Form.Item>
                        <button className="submit" type="submit">
                          SEND
                        </button>
                      </div>
                    </div>
                  </Form>
                  <p className="form-message" />
                </div>
              </div>
              <div className="col-12 col-lg-12 col-md-12 my-3">
                <div className="contact-info-wrap p-1">
                  {/* <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+012 345 678 102</p>
                      <p>+012 345 678 102</p>
                    </div>
                  </div> */}
                  <div className="single-contact-info m-2 d-flex justify-content-center">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:contact@printcoder.com">
                          contact@printcoder.com
                        </a>
                      </p>
                      {/* <p>
                        <a href="https://yourwebsitename.com">
                          yourwebsitename.com
                        </a>
                      </p> */}
                    </div>
                  </div>
                  {/* <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Address goes here, </p>
                      <p>street, Crossroad 123.</p>
                    </div>
                  </div> */}
                  {/* <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
