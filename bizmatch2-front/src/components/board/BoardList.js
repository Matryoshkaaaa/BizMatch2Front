import React from "react";
import BoardListStyle from "./BoardList.module.css";

export default function BoardList({ paginationBoardList, paginationVO }) {
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

          {paginationBoardList && paginationBoardList.length > 0 ? (
            paginationBoardList.map((line) => (
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

          {paginationBoardList.length < 5 &&
            Array.from({ length: 10 - paginationBoardList.length }, (_, i) => (
              <div className={BoardListStyle.subjectLine} key={i}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ))}
        </div>

        {paginationVO && paginationVO.groupEndPageNo > 0 && (
          <div className={BoardListStyle.pageDiv}>
            <div className={BoardListStyle.prePageBtn}>
              {paginationVO.hasPrevGroup && (
                <>
                  <div>
                    <a
                      className="white-text"
                      href={`/board/list?currPageNo=0&exposureListSize=${paginationVO.exposureListSize}`}
                    >
                      처음
                    </a>
                  </div>
                  <div>
                    <a
                      className="white-text"
                      href={`/board/list?currPageNo=${paginationVO.prevGroupStartPageNo}&exposureListSize=${paginationVO.exposureListSize}`}
                    >
                      이전
                    </a>
                  </div>
                </>
              )}
            </div>
            <div className={BoardListStyle.pageNumberBtn}>
              {Array.from(
                {
                  length:
                    paginationVO.groupEndPageNo -
                    paginationVO.groupStartPageNo +
                    1,
                },
                (_, p) => (
                  <div
                    className={
                      paginationVO.currPageNo ===
                      paginationVO.groupStartPageNo + p
                        ? BoardListStyle.active
                        : ""
                    }
                    key={p}
                  >
                    <a
                      className="white-text"
                      href={`/board/list?currPageNo=${
                        paginationVO.groupStartPageNo + p
                      }&exposureListSize=${paginationVO.exposureListSize}`}
                    >
                      {paginationVO.groupStartPageNo + p + 1}
                    </a>
                  </div>
                )
              )}
            </div>
            <div className={BoardListStyle.nextPageBtn}>
              {paginationVO.hasNextGroup && (
                <>
                  <div className={BoardListStyle.numberBox}>
                    <a
                      className="white-text"
                      href={`/board/list?currPageNo=${paginationVO.nextGroupStartPageNo}&exposureListSize=${paginationVO.exposureListSize}`}
                    >
                      다음
                    </a>
                  </div>
                  <div className={BoardListStyle.numberBox}>
                    <a
                      className="white-text"
                      href={`/board/list?currPageNo=${
                        paginationVO.pageCount - 1
                      }&exposureListSize=${paginationVO.exposureListSize}`}
                    >
                      마지막
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
