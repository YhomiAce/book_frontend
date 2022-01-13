/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const paginate = ({ postPerPage, totalPost, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="float-right">
      <ul className="pagination bg-primary">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link"
              style={{ cursor: "pointer" }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default paginate;
