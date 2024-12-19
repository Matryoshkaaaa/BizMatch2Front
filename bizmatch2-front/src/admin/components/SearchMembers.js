import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FilteringMembers from "./FilteringMembers";
import { adminMemberAction } from "../features/users/userSlice";
import styled from "styled-components";
// import { adminMemberAction } from "../../stores/ToolkitStrore";

const ManageBtn = styled.button`
  background-color: rgb(179, 201, 204);
`;

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
        <ManageBtn onClick={handleButtonClick}>검색</ManageBtn>
      </div>

      <FilteringMembers />
    </div>
  );
}
