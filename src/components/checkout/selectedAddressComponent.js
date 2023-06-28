import React from "react";

const SelectedAddressComponent = ({ address }) => {
  const { name, address1, address2, city, state, postcode, phone, email } =
    address;

  return (
    <div className="address-card">
      <div className="card-body">
        <p>{name}</p>
        <p>
          {address1} {address2 && `, ${address2}`}
        </p>

        <p>
          {city}, {state}, {postcode}
        </p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default SelectedAddressComponent;
