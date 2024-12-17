import React, { useState, useEffect } from "react";

const Search = ({ setSearchResults }) => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  // Debounce keyword (trì hoãn tìm kiếm khi người dùng gõ liên tục)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer); // Xóa timer khi keyword thay đổi
  }, [keyword]);

  // Gọi API khi debouncedKeyword thay đổi
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(
          `https://${process.env.REACT_APP_API_URL}/mycoffee/product/search?keyword=${debouncedKeyword}`,
          { method: "GET" }
        );

        if (!response.ok) throw new Error("Search API failed");

        const data = await response.json();
        const results = data.result || [];
        setSearchResults(
          results.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image_url: item.image_url,
          }))
        );
      } catch (error) {
        console.error("Error during search:", error);
      }
    };

    handleSearch();
  }, [debouncedKeyword, setSearchResults]);

  return (
    <>
      <div className="search-box d-flex justify-content-center align-items-center w-100">
        <div className="input-group search-box flex-grow-1 flex-md-grow-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật keyword mỗi khi gõ
          />
        </div>
      </div>

      <style jsx>{`
        .search-box {
          max-width: 300px; /* Điều chỉnh chiều rộng tối đa */
        }

        @media (min-width: 576px) {
          .search-box {
            max-width: 800px; /* Tăng chiều rộng trên màn hình lớn */
          }
        }

        .form-control {
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default Search;
