import React, { useEffect } from "react";
import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import { Sidebar } from "../../components/myaccount/Sidebar";
import cogoToast from "cogo-toast";
import { changePasswordAPI } from "../../apis/users.api";

export const ChangePassword = () => {
  let { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  // const { orders } = useSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login-register");
    }
  }, [currentUser, navigate]);
  const handlePasswordChange = (event) => {
    event.preventDefault();
    let values = event.target.elements;
    let oldPassword = values.oldPassword.value;
    let newPassword = values.newPassword.value;
    let confirmPassword = values.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      cogoToast.error("Passwords do not match", { position: "top-center" });
      return;
    }
    changePasswordAPI({ oldPassword, newPassword })
      .then((res) => {
        if (res.status === 200) {
          cogoToast.success("Password changed successfully", {
            position: "top-center",
          });
          values.oldPassword.value = "";
          values.newPassword.value = "";
          values.confirmPassword.value = "";
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
        titleTemplate="Change Password"
        description="Change Password page of flone react minimalist eCommerce template."
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Change Password",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="single-my-account d-flex container">
          <Sidebar selectedKey={"4"} />

          <div className="row">
            <div className="myaccount-wrapper">
              <div className="myaccount-info-wrapper">
                <div className="account-info-wrapper">
                  <h4>Change Password</h4>
                  <h5>Your Password</h5>
                </div>
                <form onSubmit={handlePasswordChange}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="billing-info">
                        <label>Current Password</label>
                        <input type="password" name="oldPassword" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info">
                        <label>New Password</label>
                        <input type="password" name="newPassword" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info">
                        <label>Password Confirm</label>
                        <input type="password" name="confirmPassword" />
                      </div>
                    </div>
                    <div className="billing-back-btn">
                      <div className="billing-btn">
                        <button type="submit">Continue</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
