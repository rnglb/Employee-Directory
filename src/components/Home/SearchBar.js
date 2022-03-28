import React, { useState } from "react";

const SearchBar = (props) => {
const searchHandler = (event) => {
    console.log(event.target.value,",,, 1")
    props.searchHandler(event.target.value);
};
  return (
    <div className="bar bar-standard bar-header-secondary">
                <input type="search"  onChange={searchHandler} value={props.searchKey}/>
            </div>
  );
};

export default SearchBar;