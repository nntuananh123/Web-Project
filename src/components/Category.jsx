import React from 'react';


const Category = () => {
  return (
    <div className="container d-flex justify-content-end">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a 
            className="nav-link dropdown-toggle" 
            href="#" 
            id="navbarDropdown" 
            role="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            Categories
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">All</a></li>
            <li><a className="dropdown-item" href="#">Food</a></li>
            <li><a className="dropdown-item" href="#">Drink</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Category;
