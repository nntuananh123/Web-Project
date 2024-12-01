import React from 'react';

const Category = ({ setCategory, setSearchResults }) => {
  const handleCategoryClick = async (categoryName) => {
    setCategory(categoryName); // Cập nhật category hiện tại

    try {
      const response = await fetch('http://localhost:8080/mycoffee/product', { method: 'GET' });

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      const results = data.result || [];

      if (categoryName === 'All') {
        setSearchResults(results); // Hiển thị tất cả nếu chọn All
      } else {
        // Lọc theo category
        const filteredResults = results.filter(
          (product) => product.category.name === categoryName
        );
        setSearchResults(filteredResults);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-end">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle fs-5"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categories
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li>
              <a className="dropdown-item fs-5" href="#" onClick={() => handleCategoryClick('All')}>
                All
              </a>
            </li>
            <li>
              <a className="dropdown-item fs-5" href="#" onClick={() => handleCategoryClick('Food')}>
                Food
              </a>
            </li>
            <li>
              <a className="dropdown-item fs-5" href="#" onClick={() => handleCategoryClick('Drink')}>
                Drink
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Category;
