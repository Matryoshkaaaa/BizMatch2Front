import React, { useState } from "react";
import BoardListStyle from "./BoardList.module.css";
import Pagination from "../pagenationApi/Pagination";
import { useSelector } from "react-redux";

export default function BoardList() {
  const { board } = useSelector((state) => ({ ...state }));
  const items = paginationBoardList;
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPageItems(items.slice(startIdx, endIdx));
    //수정
  };

  React.useEffect(() => {
    handlePageChange(1); // 초기 데이터 설정
  }, []);

  return (
    <div className={BoardListStyle.mainBox}>
      <div className={BoardListStyle.contentBox}>
        <h2 className={BoardListStyle.mainTitle}>통합게시판</h2>
        <div className={BoardListStyle.functionLine}>
          <a className={BoardListStyle.writeBtn} href="/board/write">
            글쓰기
          </a>
        </div>
        <div className={BoardListStyle.postListBox}>
          <div className={BoardListStyle.subjectLine}>
            <div>종류</div>
            <div>제목</div>
            <div>작성자</div>
            <div>공개여부</div>
            <div>수정일</div>
            <div>조회수</div>
          </div>

          {currentPageItems && currentPageItems.length > 0 ? (
            currentPageItems.map((line) => (
              <div className={BoardListStyle.subjectLine} key={line.pstId}>
                {line.pstCtgry === "0" && (
                  <div>
                    <span className={BoardListStyle.redBox}>공지</span>
                  </div>
                )}
                {line.pstCtgry === "1" && (
                  <div className={BoardListStyle.blueBox}>문의</div>
                )}
                <div>
                  <a
                    className={BoardListStyle.title}
                    href={`/board/view/${line.pstId}`}
                  >
                    {line.pstNm}
                  </a>
                </div>
                <div>{line.mbrNm}</div>
                {line.isPstOpn === "0" && <div>공개</div>}
                {line.isPstOpn === "1" && <div>비공개</div>}
                <div>{line.lstModDt}</div>
                <div>{line.pstHt}</div>
              </div>
            ))
          ) : (
            <div>게시글이 없습니다.</div>
          )}

          {/*paginationBoardList.length < 5 &&
            Array.from({ length: 10 - paginationBoardList.length }, (_, i) => (
              <div className={BoardListStyle.subjectLine} key={i}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ))*/}
        </div>
        <Pagination
          items={items}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
