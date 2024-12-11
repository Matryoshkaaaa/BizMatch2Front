import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagenationApi/Pagination";
import { useEffect, useRef, useState } from "react";
import {
  createBoardComment,
  fetchAllBoardComments,
} from "../../stores/thunks/boardCommentThunk";
import BoardViewStyle from "./BoardView.module.css";

import BoardComment from "./BoardComment";

export default function BoardCommentList(boardId) {
  const { comments } = useSelector((state) => ({ ...state }));
  const commentDispatcher = useDispatch();
  const newCommentRef = useRef();
  useEffect(() => {
    commentDispatcher(fetchAllBoardComments(boardId));
  }, [commentDispatcher, boardId]);

  const comment = comments?.data || [];
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const itemsPerPage = 15;

  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPageItems(comment.slice(startIdx, endIdx));
  };

  useEffect(() => {
    handlePageChange(1);
  }, [comment]);

  const creatNewCommentClickEvent = () => {
    commentDispatcher(createBoardComment(newComment));
  };

  // JWT에서 이메일 추출
  const token = sessionStorage.getItem("token");
  let loginInfo = null;

  const newComment = {
    pstId: boardId,
    prntCmmntId: null,
    cmmntCntnt: newCommentRef.current.value,
    athrId: loginInfo.emilAddr,
  };

  return (
    <div className={BoardViewStyle.commentBox}>
      <div className={BoardViewStyle.writeBox}>
        <textarea
          className={BoardViewStyle.commentText}
          ref={newCommentRef}
        ></textarea>
        <button
          className={BoardViewStyle.createBtn}
          onClick={creatNewCommentClickEvent}
        >
          등록
        </button>
      </div>
      <div className={BoardViewStyle.listBox}>
        {currentPageItems && currentPageItems.length > 0 ? (
          currentPageItems.map((item) => (
            <BoardComment
              data={item}
              loginEmail={loginInfo.email}
              style={BoardViewStyle}
            />
          ))
        ) : (
          <div>댓글이 존재하지 않습니다.</div>
        )}
      </div>
      <Pagination
        items={comment}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
