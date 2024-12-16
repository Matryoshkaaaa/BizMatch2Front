import React, { useState, useMemo, useCallback } from "react";
import PaginationStyle from "./Pagination.module.css";
const Pagination = ({ items, itemsPerPage = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수 계산

  // 현재 페이지에 해당하는 아이템 리스트 계산, 리스트 출력을 밖으로 빼면서 사용 X
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, items, itemsPerPage]);

  // 보여줄 페이지 번호의 시작과 끝을 계산 (10개씩 페이지 번호를 표시)
  const pageNumbersPerRange = 10; // 한 페이지 범위에서 10개씩 표시
  const currentPageGroup = Math.floor((currentPage - 1) / pageNumbersPerRange); // 현재 페이지 그룹 (0부터 시작)

  // 현재 그룹에 해당하는 페이지 번호들
  const displayedPageNumbers = useMemo(() => {
    const start = currentPageGroup * pageNumbersPerRange + 1;
    const end = Math.min(start + pageNumbersPerRange - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPageGroup, totalPages]);

  // 페이지 변경 시 처리
  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setCurrentPage(page);
        onPageChange(page); // 페이지 변경 이벤트 전달
      }
    },
    [currentPage, totalPages, onPageChange]
  );

  // 첫 번째 페이지로 이동
  const goToFirstPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      onPageChange(1); // 페이지 변경 이벤트 전달
    }
  }, [currentPage, onPageChange]);

  // 마지막 페이지로 이동
  const goToLastPage = useCallback(() => {
    if (currentPage !== totalPages) {
      setCurrentPage(totalPages);
      onPageChange(totalPages); // 페이지 변경 이벤트 전달
    }
  }, [currentPage, totalPages, onPageChange]);

  // 이전 페이지 그룹으로 이동 (1-10 -> 11-20)
  const goToPreviousPageGroup = useCallback(() => {
    if (currentPageGroup > 0) {
      const newPageGroup = currentPageGroup - 1;
      const newPage = newPageGroup * pageNumbersPerRange + 1;
      setCurrentPage(newPage);
      onPageChange(newPage); // 페이지 변경 이벤트 전달
    }
  }, [currentPageGroup, onPageChange]);

  // 다음 페이지 그룹으로 이동 (1-10 -> 11-20)
  const goToNextPageGroup = useCallback(() => {
    if (currentPageGroup < Math.floor((totalPages - 1) / pageNumbersPerRange)) {
      const newPageGroup = currentPageGroup + 1;
      const newPage = newPageGroup * pageNumbersPerRange + 1;
      setCurrentPage(newPage);
      onPageChange(newPage); // 페이지 변경 이벤트 전달
    }
  }, [currentPageGroup, totalPages, onPageChange]);

  return (
    <div className={PaginationStyle.pagination}>
      {/* 첫 페이지 버튼 */}
      <button
        className={`${PaginationStyle.arrow} first`}
        onClick={goToFirstPage}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>

      {/* 이전 페이지 그룹 버튼 */}
      <button
        className={`${PaginationStyle.arrow}`}
        onClick={goToPreviousPageGroup}
        disabled={currentPageGroup === 0}
      >
        &lt;
      </button>

      {/* 페이지 번호 버튼 */}
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

      {/* 다음 페이지 그룹 버튼 */}
      <button
        className={`${PaginationStyle.arrow}`}
        onClick={goToNextPageGroup}
        disabled={
          currentPageGroup >= Math.floor((totalPages - 1) / pageNumbersPerRange)
        }
      >
        &gt;
      </button>

      {/* 마지막 페이지 버튼 */}
      <button
        className={`${PaginationStyle.arrow} last`}
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
