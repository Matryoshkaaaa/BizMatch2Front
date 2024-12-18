import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FilteringMembers from "./FilteringMembers";
import { adminMemberAction } from "../features/users/userSlice";
// import { adminMemberAction } from "../../stores/ToolkitStrore";

export default function SearchMembers() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const searchEmail = (query) => {
    dispatch(adminMemberAction.filterMembersByEmail(query));
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

      <FilteringMembers />
    </div>
  );
}
