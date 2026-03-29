// components/track-status/track-search.tsx

import React, { useState } from "react";
import { SearchIcon } from "./icons";

interface SearchBarProps {
  onSearch?: (id: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Enter ID",
}) => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(value.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-white px-4 py-3">
      <div className="flex items-center rounded-3xl border border-[#ddd] bg-white px-3.5 py-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-none bg-transparent text-[14px] text-[#333] outline-none"
        />
        <button
          onClick={handleSearch}
          className="flex cursor-pointer items-center border-none bg-transparent p-0"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
