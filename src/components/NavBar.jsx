import React, { useState, useEffect } from "react";
import Search from "./Search";

const Navbar = ({ showSearch, setSearchResults, cartCount }) => {
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
            <span className="navbar-text text-light fs-2">Shopping Cart</span>
          )}
        </div>

        {/* Cart Icon */}
        <a className="nav-link position-relative" href="Cart">
          <i className="bi bi-cart fs-1"></i>
          {cartCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.75rem" }}
            >
              {cartCount}
            </span>
          )}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

