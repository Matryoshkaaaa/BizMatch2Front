import React, { useState, useMemo, useCallback } from "react";

// Pagination 컴포넌트
const Pagination = ({ items, itemsPerPage = 5, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수 계산

  // 현재 페이지에 해당하는 아이템 리스트 계산
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, items, itemsPerPage]);

  // 페이지 번호 범위 계산 (1부터 totalPages까지)
  const pageNumberRange = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

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

  // 이전 페이지로 이동
  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      if (newPage !== prev) {
        onPageChange(newPage); // 페이지 변경 이벤트 전달
      }
      return newPage;
    });
  }, [onPageChange]);

  // 다음 페이지로 이동
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages);
      if (newPage !== prev) {
        onPageChange(newPage); // 페이지 변경 이벤트 전달
      }
      return newPage;
    });
  }, [onPageChange, totalPages]);

  return (
    <div>
      {/* 페이지 버튼 */}
      <div>
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          처음
        </button>

        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          이전
        </button>

        {pageNumberRange.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}

        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          다음
        </button>

        <button onClick={goToLastPage} disabled={currentPage === totalPages}>
          마지막
        </button>
      </div>
    </div>
  );
};

export default Pagination;
