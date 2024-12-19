import React, { useState, useMemo, useCallback } from "react";
import PaginationStyle from "./Pagination.module.css";

const Pagination = ({ items, itemsPerPage = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbersPerRange = 10;

  const currentPageGroup = Math.floor((currentPage - 1) / pageNumbersPerRange);

  const displayedPageNumbers = useMemo(() => {
    const start = currentPageGroup * pageNumbersPerRange + 1;
    const end = Math.min(start + pageNumbersPerRange - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPageGroup, totalPages]);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setCurrentPage(page);
        onPageChange(page);
      }
    },
    [currentPage, totalPages, onPageChange]
  );

  const goToFirstPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      onPageChange(1);
    }
  }, [currentPage, onPageChange]);

  const goToLastPage = useCallback(() => {
    if (currentPage !== totalPages) {
      setCurrentPage(totalPages);
      onPageChange(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  const goToPreviousPageGroup = useCallback(() => {
    if (currentPageGroup > 0) {
      const newPage = currentPageGroup * pageNumbersPerRange;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  }, [currentPageGroup, onPageChange]);

  const goToNextPageGroup = useCallback(() => {
    if (currentPageGroup < Math.floor((totalPages - 1) / pageNumbersPerRange)) {
      const newPage = (currentPageGroup + 1) * pageNumbersPerRange + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  }, [currentPageGroup, totalPages, onPageChange]);

  if (totalItems === 0) return null;

  return (
    <div className={PaginationStyle.pagination}>
      <button
        className={`${PaginationStyle.arrow} first`}
        onClick={goToFirstPage}
        disabled={currentPage === 1}
      >
        &lt;&lt; 처음
      </button>

      <button
        className={`${PaginationStyle.arrow}`}
        onClick={goToPreviousPageGroup}
        disabled={currentPageGroup === 0}
      >
        &lt; 이전
      </button>

      {displayedPageNumbers.map((page) => (
        <button
          key={page}
          className={`${PaginationStyle.button} ${
            currentPage === page ? PaginationStyle.active : ""
          }`}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}

      <button
        className={`${PaginationStyle.arrow}`}
        onClick={goToNextPageGroup}
        disabled={
          currentPageGroup >= Math.floor((totalPages - 1) / pageNumbersPerRange)
        }
      >
        다음 &gt;
      </button>

      <button
        className={`${PaginationStyle.arrow} last`}
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
      >
        마지막 &gt; &gt;
      </button>
    </div>
  );
};

export default Pagination;
