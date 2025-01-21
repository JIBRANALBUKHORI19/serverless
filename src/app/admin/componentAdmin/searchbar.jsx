"use client";
import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  color: black;
  background-color: #fff;
`;

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <StyledInput
      type="text"
      color="black"
      value={searchQuery}
      onChange={onSearchChange}
      placeholder="Search..."
    />
  );
};

export default SearchBar;
