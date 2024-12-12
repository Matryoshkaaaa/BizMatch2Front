import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagenationApi/Pagination";
import { useEffect, useRef, useState } from "react";
import {
  createBoardComment,
  fetchAllBoardComments,
} from "../../stores/thunks/boardCommentThunk";
import BoardViewStyle from "./BoardView.module.css";
import BoardComment from "./BoardComment";

export default function BoardCommentList({ boardId }) {
  const { boardComment } = useSelector((state) => ({ ...state }));

  const jwt = useSelector((state) => state.member);
  const currUserEmail = jwt.info?.emilAddr;

  const commentDispatcher = useDispatch();
  const newCommentRef = useRef();
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const itemsPerPage = 15;

  // 댓글 데이터 가져오기 (최초 1회 또는 boardId 변경 시 호출)
  useEffect(() => {
    if (boardId) {
      commentDispatcher(fetchAllBoardComments(boardId));
    }
  }, [commentDispatcher, boardId]);

  const comments = boardComment?.data || [];
  console.log(comments);
  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPageItems(comments.slice(startIdx, endIdx));
  };

  // 댓글 데이터가 변경될 때 첫 페이지로 이동
  useEffect(() => {
    handlePageChange(1);
  }, [comments]);

  // 새로운 댓글 생성
  const creatNewCommentClickEvent = () => {
    const newCommentContent = newCommentRef.current.value.trim();
    if (!newCommentContent) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const newComment = {
      pstId: boardId,
      prntCmmntId: null,
      cmmntCntnt: newCommentContent,
      athrId: currUserEmail,
    };

    commentDispatcher(createBoardComment(newComment))
      .then(() => {
        alert("댓글이 등록되었습니다.");
        newCommentRef.current.value = ""; // 입력 필드 초기화
        commentDispatcher(fetchAllBoardComments(boardId)); // 댓글 목록 새로고침
      })
      .catch(() => alert("댓글 등록에 실패했습니다."));
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
        {currentPageItems.length > 0 ? (
          currentPageItems.map((item) => (
            <BoardComment key={item.cmmntId} data={item} />
          ))
        ) : (
          <div>댓글이 존재하지 않습니다.</div>
        )}
      </div>
      <Pagination
        items={comments}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
