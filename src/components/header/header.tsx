import React, { useState } from "react";
import Banner from "../../assets/images/banner.jpg";

import { Dispatch } from "redux";

import "./header.scss";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { handleSearch as handleSearchAction } from "../../store/actionCreators";

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  const [searchName, setSearchName] = useState("");

  const handleChange = (name: string) => {
    setSearchName(name);
  };
  const handleSearch = () => {
    dispatch(handleSearchAction(searchName));
    history.push("/");
  };

  return (
    <>
      <div className="banner-wrapper" onClick={() => history.push("/")}>
        <div className="banner-inner-wrapper">
          <img className="banner" src={Banner} alt="" />
        </div>
      </div>
      <div className="search-bar-wrapper">
        <div className="search-bar-form">
          Heroes Search
          <div className="search-bar-input">
            <input
              type="text"
              onChange={(event) => handleChange(event.currentTarget.value)}
              value={searchName}
            />
            <input type="submit" value="Submit" onClick={handleSearch} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
