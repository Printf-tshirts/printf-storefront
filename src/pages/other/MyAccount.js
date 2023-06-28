import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Sidebar } from "../../components/myaccount/Sidebar";
import { updateUserAPI } from "../../apis/users.api";
import cogoToast from "cogo-toast";
import { setCurrentUser } from "../../store/slices/user-slice";
import { Form, Input } from "antd";

const MyAccount = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login-register");
    }
  }, [currentUser, navigate]);
  const handleUpdateUser = (values) => {
    console.log(values);
    updateUserAPI(values)
      .then((res) => {
        if (res.status === 200) {
          cogoToast.success("User updated successfully", {
            position: "top-center",
          });
          dispatch(setCurrentUser(res.data.user));
        } else {
          cogoToast.error(res.message, { position: "top-center" });
        }
      })
      .catch((err) => {
        cogoToast.error(err.message, { position: "top-center" });
      });
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="single-my-account d-flex container">
          <Sidebar selectedKey={"1"} />
          <div className="row">
            <div className="myaccount-wrapper">
              <div className="myaccount-info-wrapper">
                <div className="account-info-wrapper">
                  <h4>My Account Information</h4>
                  <h5>Your Personal Details</h5>
                </div>
                <Form onFinish={handleUpdateUser}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="billing-info">
                        <Form.Item
                          label="Name"
                          name={"name"}
                          initialValue={currentUser?.name}>
                          <Input type="text" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info">
                        <Form.Item
                          label="Email"
                          name={"email"}
                          initialValue={currentUser?.email}>
                          <Input type="text" disabled={true} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info">
                        <Form.Item
                          label="Phone"
                          name={"phone"}
                          initialValue={currentUser?.phone}>
                          <Input type="text" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="billing-back-btn">
                    <div className="billing-btn">
                      <button type="submit">Continue</button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
