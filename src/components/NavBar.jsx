import React from "react";
import Search from "./Search";

const Navbar = ({ showSearch, setSearchResults }) => {
  return (
    <nav className="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Menu Icon */}
        <a className="nav-link" href="Menu">
          <i className="bi bi-list fs-1"></i>
        </a>

        {/* Search hoặc Shopping Cart */}
        <div className="flex-grow-1 d-flex justify-content-center">
          {showSearch ? (
            <Search setSearchResults={setSearchResults} />
          ) : (
            <span className="navbar-text text-light fs-2 ">Shopping Cart</span>
          )}
        </div>

        {/* Cart Icon */}
        <a className="nav-link" href="Cart">
          <i className="bi bi-cart fs-1"></i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
