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
          `http://localhost:8080/mycoffee/product/search?keyword=${debouncedKeyword}`,
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
      <div className="d-flex align-items-center mx-auto">
        <div className="search-box d-flex align-items-center border">
          <input
            placeholder="Search..."
            className="input"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật keyword mỗi khi gõ
          />
        </div>
      </div>

      <style jsx>{`
        .search-box {
          height: 45px;
          border-radius: 5px;
          background-color: #333333;
        }

        .input {
          color: #cccccc;
          background-color: #333333;
          border: none;
          outline: none;
          padding: 5px;
        }

        .input::placeholder {
          color: #808080;
        }
      `}</style>
    </>
  );
};

export default Search;
