import React from "react";
import BoardViewStyle from "./BoardView.module.css";

export default function BoardView({
  boardVO,
  comments,
  loginInfo,
  paginationVO,
}) {
  return (
    <div className={BoardViewStyle.mainBox}>
      <div className={BoardViewStyle.contentBox}>
        <div className={BoardViewStyle.title}>{boardVO.pstNm}</div>

        <div className={BoardViewStyle.postInfo}>
          <div className={BoardViewStyle.postType}>
            {boardVO.pstCtgry === "0" && (
              <div className={BoardViewStyle.typeDeco}>공지</div>
            )}
            {boardVO.pstCtgry === "1" && (
              <div className={BoardViewStyle.blueBox}>문의</div>
            )}

            <div className={BoardViewStyle.author}>작성자: {boardVO.mbrNm}</div>
          </div>
          <div className={BoardViewStyle.times}>
            <div>마지막 수정일: {boardVO.lstModDt}</div>
          </div>
        </div>
        <div className={BoardViewStyle.mainContent}>{boardVO.pstCntnt}</div>

        {boardVO.athrId === loginInfo.emilAddr && (
          <div className={BoardViewStyle.functionLine}>
            <a
              className={BoardViewStyle.modifyBtn}
              href={`/board/modify/${boardVO.pstId}`}
            >
              수정
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
