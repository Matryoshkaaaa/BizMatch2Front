import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../pagenationApi/Pagination";
import BoardViewStyle from "../ProjectInfo.module.css";

import { useEffect, useRef, useState } from "react";
import {
  createProjectComment,
  fetchAllProjectComments,
} from "../../../stores/thunks/projectCommentThunk";
import ProjectComment from "./ProjectComment";

export default function ProjectCommmentList({ pjId }) {
  const { projectComment } = useSelector((state) => ({ ...state }));
  const [isWriting, setIsWriting] = useState(true);
  const commentDispatcher = useDispatch();
  const commentRef = useRef();
  const [currentPageItems, setCurrentPageItems] = useState([]);
  const itemsPerPage = 15;

  const comments = projectComment?.data || [];
  console.log(comments);

  // 댓글 데이터 가져오기 (최초 1회 또는 projectId 변경 시 호출)
  useEffect(() => {
    if (pjId && comments.length === 0) {
      commentDispatcher(fetchAllProjectComments(pjId));
    }
  }, [pjId]);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPageItems(comments.slice(startIdx, endIdx));
  };

  // 댓글 데이터가 변경될 때 첫 페이지로 이동
  useEffect(() => {
    if (comments.length > 0) {
      handlePageChange(1);
    }
  }, [comments]);

  const newCommentButtonHanlder = () => {
    setIsWriting(!isWriting);
  };

  const jwt = useSelector((state) => ({ ...state.member }));
  const currUserEmail = jwt.info?.emilAddr;

  const addReplyHandler = async () => {
    const newComment = {
      pjId: pjId,
      prntCmmntId: null,
      cmmntCntnt: commentRef.current.value,
      athrId: currUserEmail,
    };
    console.log(newComment);
    commentDispatcher(createProjectComment(newComment))
      .then(() => {
        alert("댓글이 등록되었습니다.");
        commentRef.current.value = ""; // 입력 필드 초기화
        commentDispatcher(fetchAllProjectComments(pjId)); // 댓글 목록 새로고침
        setIsWriting(!isWriting);
      })
      .catch(() => alert("댓글 등록에 실패했습니다."));
  };

  return (
    <>
      {isWriting ? (
        <button
          className={BoardViewStyle.newCommentButton}
          onClick={newCommentButtonHanlder}
        >
          새 문의 작성하기
        </button>
      ) : (
        <div className={BoardViewStyle.recommentWriteBox}>
          <textarea
            className={BoardViewStyle.recommentText}
            placeholder="답글을 입력하세요"
            ref={commentRef}
          />
          <button
            className={BoardViewStyle.submitBtn}
            onClick={addReplyHandler}
          >
            등록
          </button>
        </div>
      )}
      ;
      <div className={BoardViewStyle.commentBox}>
        <div className={BoardViewStyle.listBox}>
          {currentPageItems.length > 0 ? (
            currentPageItems.map((item) => (
              <ProjectComment
                key={item.cmmntId}
                commentData={item}
                projectId={pjId}
              />
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
    </>
  );
}
