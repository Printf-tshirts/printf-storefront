import { Form, Input } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const MobileSearch = () => {
  const navigate = useNavigate();
  const searchTermRef = useRef(null);
  const handleSearch = () => {
    navigate("/search/" + searchTermRef.current.value);
  };

  return (
    <div className="offcanvas-mobile-search-area">
      <Form onFinish={handleSearch}>
        <input
          type="search"
          name="searchTerm"
          ref={searchTermRef}
          placeholder="Search ..."
        />
        <button type="submit">
          <i className="fa fa-search" />
        </button>
      </Form>
    </div>
  );
};

export default MobileSearch;
