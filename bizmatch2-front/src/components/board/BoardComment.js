import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoardComment,
  updateBoardComment,
  removeBoardComment,
  fetchAllBoardComments,
} from "../../stores/thunks/boardCommentThunk";
import BoardViewStyle from "./BoardView.module.css";
export default function BoardComment({ data, boardId }) {
  const [isReplying, setIsReplying] = useState(false); // 답글 입력창 표시 여부
  const [isEditing, setIsEditing] = useState(false); // 수정 입력창 표시 여부
  const commentDispatcher = useDispatch();
  const modifyRef = useRef();
  const recommentRef = useRef();
  const jwt = useSelector((state) => ({ ...state.member }));
  const currUserEmail = jwt.info?.emilAddr;

  const deleteCommentHandler = () => {
    commentDispatcher(removeBoardComment(data.cmmntId)).then(() => {
      commentDispatcher(fetchAllBoardComments(boardId));
    });
  };

  const modifyCommentHandler = () => {
    const fixedComment = {
      cmmntId: data.cmmntId,
      cmmntCntnt: modifyRef.current.value, // 수정 내용
    };
    commentDispatcher(updateBoardComment(fixedComment)).then(() => {
      commentDispatcher(fetchAllBoardComments(boardId));
      modifyRef.current.value = "";
      setIsEditing(false);
    });
    // 입력 필드 초기화
    // 수정창 닫기
  };

  const addReplyHandler = async () => {
    const newComment = {
      pstId: boardId,
      prntCmmntId: data.cmmntId,
      cmmntCntnt: recommentRef.current.value,
      athrId: currUserEmail,
    };
    console.log(newComment);
    commentDispatcher(createBoardComment(newComment))
      .then(() => {
        alert("댓글이 등록되었습니다.");
        recommentRef.current.value = ""; // 입력 필드 초기화
        commentDispatcher(fetchAllBoardComments(boardId)); // 댓글 목록 새로고침
        setIsReplying(false);
      })
      .catch(() => alert("댓글 등록에 실패했습니다."));
  };
  //
  return (
    <>
      {data.isDlt === 0 ? (
        <div
          className={BoardViewStyle.oneComment}
          style={{ marginLeft: `${(data.lv - 1) * 1.2}rem` }}
        >
          <div className={BoardViewStyle.commentUpperside}>
            <div className={BoardViewStyle.commentLeftPart}>
              <div className={BoardViewStyle.name}>
                {data.mbrNm} ({data.athrId})
              </div>
              {!isEditing ? (
                <div className={BoardViewStyle.content}>{data.cmmntCntnt}</div>
              ) : (
                <div className={BoardViewStyle.modifyWriteBox}>
                  <textarea
                    ref={modifyRef}
                    defaultValue={data.cmmntCntnt}
                    className={BoardViewStyle.modifyText}
                  />
                  <button
                    className={BoardViewStyle.submitBtn}
                    onClick={modifyCommentHandler}
                  >
                    등록
                  </button>
                </div>
              )}
            </div>
            <div className={BoardViewStyle.commentRightPart}>
              <div className={BoardViewStyle.dateBox}>
                <div className={BoardViewStyle.createDate}>{data.lstModDt}</div>
              </div>
              <div
                className={BoardViewStyle.functionLine}
                data-id={data.cmmntId}
              >
                {data.athrId === currUserEmail && (
                  <>
                    <input
                      className={BoardViewStyle.modifyCommentBtn}
                      type="button"
                      value="수정"
                      onClick={() => setIsEditing(!isEditing)} // 수정창 토글
                    />
                    <input
                      className={BoardViewStyle.deleteCommentBtn}
                      type="button"
                      value="삭제"
                      onClick={deleteCommentHandler}
                    />
                  </>
                )}
                <input
                  className={BoardViewStyle.recommentBtn}
                  type="button"
                  value="답글"
                  onClick={() => setIsReplying(!isReplying)} // 답글창 토글
                />
              </div>
            </div>
          </div>
          {isReplying && (
            <div className={BoardViewStyle.recommentWriteBox}>
              <textarea
                className={BoardViewStyle.recommentText}
                placeholder="답글을 입력하세요"
                ref={recommentRef}
              />
              <button
                className={BoardViewStyle.submitBtn}
                onClick={addReplyHandler}
              >
                등록
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className={BoardViewStyle.deletedComment}
          style={{ marginLeft: `${(data.lv - 1) * 1.2}rem` }}
        >
          삭제된 댓글입니다.
        </div>
      )}
    </>
  );
}
