// src/components/Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {range(1, totalPages).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } px-3 py-2 rounded`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
