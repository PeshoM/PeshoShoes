import React, { useState, createContext } from "react";
import { useSearchParams } from "react-router-dom";

interface filter {
  season?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: string;
  color?: string;
  category?: string;
  sport?: string;
  searchInput?: string;
  categoryTag?: string;
  categoryItem?: string;
}

const FilterContext = createContext({} as any);

const Context1 = ({ children }) => {
  const [filter, setFilter] = useState<filter>();
  const [searchParams, setSearchParams] = useSearchParams();
  const changeFilter = (newFilter: filter) => {
    setFilter((prev) => {
      let params: filter = { ...prev, ...newFilter };
      // console.log("params", params);
      setSearchParams(params as any);
      return params;
    });
  };
  const changeNavFilter = (newFilter: filter) => {
    setFilter((prev) => {
      let params: filter = { ...newFilter };
      console.log("params", params);
      setSearchParams(params as any);
      return params;
    });
  };
  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
        changeFilter,
        changeNavFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { Context1, FilterContext };
