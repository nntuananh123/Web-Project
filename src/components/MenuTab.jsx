import React from 'react';

const Search = () => {
  return (
    <div className="radio-inputs">
      <label className="radio">
        <input type="radio" name="radio" defaultChecked />
        <span className="name">All</span>
      </label>
      <label className="radio">
        <input type="radio" name="radio" />
        <span className="name">Food</span>
      </label>
      <label className="radio">
        <input type="radio" name="radio" />
        <span className="name">Drink</span>
      </label>

      <style jsx>{`
        .radio-inputs {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          border-radius: 0.5rem;
          background-color: #eee;
          box-sizing: border-box;
          box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
          padding: 0.25rem;
          width: 300px;
          font-size: 14px;
        }

        .radio-inputs .radio {
          flex: 1 1 auto;
          text-align: center;
        }

        .radio-inputs .radio input {
          display: none;
        }

        .radio-inputs .radio .name {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          border: none;
          padding: 0.5rem 0;
          color: rgba(51, 65, 85, 1);
          transition: all 0.15s ease-in-out;
        }

        .radio-inputs .radio input:checked + .name {
          background-color: #fff;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Search;