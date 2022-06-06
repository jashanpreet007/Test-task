import React, { useState } from "react";

interface Props {
  onSearchTermChange: Function;
}

const SearchBar = ({ onSearchTermChange }: Props) => {
  const [term, setTerm] = useState();

  const onInputChange = (e: any) => {
    console.log(e.target.value);
    setTerm(e.target.value);
    onSearchTermChange(term);
  };

  return (
    <div className="search-bar">
      <input type="text" value={term} onChange={onInputChange} />
    </div>
  );
};

export default SearchBar;
