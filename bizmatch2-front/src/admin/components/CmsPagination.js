import React, { useMemo } from "react";

export default function CmsPagination({
  totalItems = 0, // 기본값 0 설정
  itemsPerPage = 10, // 기본값 10 설정
  currentPage = 1, // 기본값 1 설정
  onPageChange,
}) {
  // totalItems, itemsPerPage 값을 안전하게 처리한 후 totalPages 계산
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;

  // 페이지 번호 배열 계산 (useMemo로 최적화)
  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  if (totalPages <= 1) return null; // 페이지가 1개 이하일 경우 표시하지 않음

  return (
    <div>
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        처음
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => onPageChange(number)}>
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        마지막
      </button>
    </div>
  );
}
