import React, { ReactNode } from "react";

import "./pagination.styles.scss";

export interface PaginationProps {
  count: number;
  onChange(page: number): void;
  currentPage: number;
}
export const Pagination: React.FC<PaginationProps> = (props) => {
  const { count, onChange, currentPage = 1 } = props;

  const renderPage = () => {
    const result: ReactNode[] = [];
    const TOTAL_PAGES = count < 10 ? count : 10;
    const firstVisiblePage =
      currentPage >= TOTAL_PAGES ? currentPage - (TOTAL_PAGES - 1) : 1;
    const lastVisiblePage =
      currentPage > TOTAL_PAGES ? currentPage : TOTAL_PAGES;

    for (let index = firstVisiblePage; index <= lastVisiblePage; index++) {
      result.push(
        <button
          key={index}
          onClick={() => onChange(index)}
          className={[
            "pagination-number-button",
            currentPage === index ? "--pagination-active" : "",
          ].join(" ")}
        >
          {index}
        </button>
      );
    }
    return result;
  };
  return (
    <div className="pagination-wrapper">
      <button
        className="pagination-text-button"
        id="first-button"
        onClick={() => onChange(1)}
        disabled={currentPage === 1}
      >
        Primeira
      </button>
      <button
        className="previous-button"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        <svg
          className="previous-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 5.857 9.919"
        >
          <path
            d="M453.825,748.967a.966.966,0,0,1-.69-.291,1,1,0,0,1,0-1.4l3.215-3.266-3.215-3.266a1,1,0,0,1,0-1.4.965.965,0,0,1,1.38,0l3.9,3.968a1,1,0,0,1,0,1.4l-3.9,3.968A.966.966,0,0,1,453.825,748.967Z"
            transform="translate(-452.849 -739.048)"
          />
        </svg>
      </button>
      {renderPage()}
      <button
        className="next-button"
        disabled={currentPage === count}
        onClick={() => onChange(currentPage + 1)}
      >
        <svg
          className="next-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 5.857 9.919"
        >
          <path
            d="M453.825,748.967a.966.966,0,0,1-.69-.291,1,1,0,0,1,0-1.4l3.215-3.266-3.215-3.266a1,1,0,0,1,0-1.4.965.965,0,0,1,1.38,0l3.9,3.968a1,1,0,0,1,0,1.4l-3.9,3.968A.966.966,0,0,1,453.825,748.967Z"
            transform="translate(-452.849 -739.048)"
          />
        </svg>
      </button>
      <button
        className="pagination-text-button"
        id="last-button"
        onClick={() => onChange(count)}
        disabled={currentPage === count}
      >
        Última
      </button>
    </div>
  );
};

export default Pagination;
