import React, { useState } from "react";
import Pagination from "./Pagination";

const PaginationTest = () => {
  const itemsA = Array.from({ length: 100 }, (_, index) => `${index + 1}`);
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPageItems(itemsA.slice(startIdx, endIdx));
  };

  React.useEffect(() => {
    handlePageChange(1); // 초기 데이터 설정
  }, []);

  return (
    <div>
      <ul>
        {currentPageItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Pagination
        items={itemsA}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationTest;
