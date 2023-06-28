import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../../components/myaccount/Sidebar";
import { Button, Modal } from "antd";
import {
  addAddressAPI,
  deleteAddressAPI,
  getAddressesAPI,
} from "../../apis/addresses.api";
import {
  addAddress,
  selectAddress,
  setAddresses,
} from "../../store/slices/address-slice";
import cogoToast from "cogo-toast";

export const MyAddresses = () => {
  let { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { addresses } = useSelector((state) => state.address);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  // const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login-register");
    }
  }, [currentUser, navigate]);
  const createAddressEntry = (address) => {
    return (
      <>
        <div className="row">
          <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center border-bottom">
            <div className="entries-info text-center">
              <p>{address.name}</p>
              <p>{address.email}</p>
              <p>{address.phone}</p>
              <p>
                {address.address1} {address.address2}
              </p>
              <p>
                {address.city}, {address.state}, {address.postcode}
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center border-bottom">
            <div className="entries-edit-delete text-center">
              <button
                onClick={() => {
                  showDeleteModal(address);
                }}>
                Delete
              </button>
              {/* <button className="edit">Edit</button> */}
            </div>
          </div>
        </div>
      </>
    );
  };
  const showDeleteModal = (address) => {
    setDeleteModalOpen(true);
    setCurrentAddress(address);
  };
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
    deleteAddressAPI({ addressId: currentAddress._id })
      .then((res) => {
        cogoToast.success(res.data.message, { position: "top-center" });
        getAddressesAPI().then((res) => {
          dispatch(
            setAddresses({
              addresses: res.data.addresses,
            }),
          );
        });
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error(err.message, { position: "top-center" });
      });
  };
  const showAddModal = () => {
    setAddModalOpen(true);
  };
  const handleAddCancel = () => {
    setAddModalOpen(false);
  };
  const handleAddAddress = (e) => {
    e.preventDefault();
    const payload = {
      user: currentUser._id,
      name: e.target.name.value,
      address1: e.target.address1.value,
      address2: e.target.address2.value,
      city: e.target.city.value,
      state: e.target.state.value,
      postcode: e.target.postcode.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };
    addAddressAPI({ address: payload })
      .then(async (res) => {
        await dispatch(addAddress(res.data.address));
        cogoToast.success(res.data.message, { position: "top-center" });
        setAddModalOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
        cogoToast.error(err.response.data, { position: "top-center" });
      });
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Addresses"
        description="My Addresses page of flone react minimalist eCommerce template."
      />
      <LayoutOne>
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Addresses", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="single-my-account d-flex container">
          <Sidebar selectedKey={"3"} />
          <div className="row w-100">
            <div className="myaccount-wrapper">
              <div className="myaccount-info-wrapper">
                <div className="account-info-wrapper d-flex justify-content-between align-items-center">
                  <h4>Address Book Entries</h4>
                  <Button
                    onClick={() => {
                      showAddModal();
                    }}>
                    Add New Address
                  </Button>
                </div>
                <div className="entries-wrapper">
                  {addresses.length === 0 && (
                    <div className="entries-info text-center">
                      <p>No addresses found</p>
                    </div>
                  )}
                  <div className="row">{addresses.map(createAddressEntry)}</div>
                </div>
                <div className="billing-back-btn">
                  <div className="billing-btn">
                    <button type="submit">Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Confirm Delete?"
          open={deleteModalOpen}
          onCancel={handleDeleteCancel}
          onOk={handleDeleteConfirm}>
          <p>Are you sure you want to delete this address?</p>
        </Modal>
        <Modal
          title="Add New Address"
          open={addModalOpen}
          onCancel={handleAddCancel}
          footer={null}>
          <form onSubmit={handleAddAddress}>
            <div className="billing-info-wrap">
              <div className="row your-order-area">
                <>
                  <div className="col-lg-12">
                    <div className="billing-info mb-20">
                      <label>Name</label>
                      <input name="name" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-info mb-20">
                      <label>Street Address</label>
                      <input
                        className="billing-address"
                        name="address1"
                        placeholder="House number and street name"
                        type="text"
                      />
                      <input
                        name="address2"
                        placeholder="Apartment, suite, unit etc."
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="billing-info mb-20">
                      <label>Town / City</label>
                      <input name="city" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-20">
                      <label>State / County</label>
                      <input name="state" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-20">
                      <label>Postcode / ZIP</label>
                      <input name="postcode" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-20">
                      <label>Phone</label>
                      <input name="phone" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="billing-info mb-20">
                      <label>Email Address</label>
                      <input name="email" type="text" />
                    </div>
                  </div>
                </>
                <div className="place-order mt-25">
                  <button type="submit" className="btn-hover">
                    Add Address
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </LayoutOne>
    </Fragment>
  );
};
