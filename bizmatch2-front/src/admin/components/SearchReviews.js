import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FilteringReviews from "./FilteringReviews";
import { adminReviewAction } from "../features/users/reviewSlice";
// import { adminReviewAction } from "../../stores/ToolkitStrore";

export default function SearchReviews() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  // const type = useLocation();
  // console.log(type.pathname);

  // const urlType = type.pathname;

  // if(urlType === "/admin/reviews"){

  // }

  const searchEmail = (query) => {
    dispatch(adminReviewAction.filterReviewsByEmail(query));
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    searchEmail(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      searchEmail(searchQuery);
    }
  };

  const handleButtonClick = () => {
    searchEmail(searchQuery);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <div>
        <input
          style={{ width: "15rem" }}
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="이메일로 검색"
        />
        <button onClick={handleButtonClick}>검색</button>
      </div>

      <FilteringReviews />
    </div>
  );
}
