import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoardComment,
  updateBoardComment,
  removeBoardComment,
  fetchAllBoardComments,
} from "../../stores/thunks/boardCommentThunk";
import CommentStyle from "./CommentDefualt.module.css";
export default function BoardComment({ data, boardId }) {
  const [isReplying, setIsReplying] = useState(false); // 답글 입력창 표시 여부
  const [isEditing, setIsEditing] = useState(false); // 수정 입력창 표시 여부
  const commentDispatcher = useDispatch();
  const modifyRef = useRef();
  const recommentRef = useRef();
  const jwt = useSelector((state) => ({ ...state.member }));
  const currUserEmail = jwt.info?.emilAddr;
  console.log(data);
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

  const addReplyHandler = () => {
    const newComment = {
      pstId: boardId,
      prntCmmntId: data.cmmntId,
      cmmntCntnt: recommentRef.current.value,
      athrId: currUserEmail,
    };

    commentDispatcher(createBoardComment(newComment)).then(() => {
      recommentRef.current.value = ""; // 입력 필드 초기화
      commentDispatcher(fetchAllBoardComments(boardId)); // 댓글 목록 새로고침
      setIsReplying(false);
    });
  };
  //
  const name = maskName(data.mbrNm);
  return (
    <>
      {data.isDlt === 0 ? (
        <div
          className={CommentStyle.commentBox}
          style={{ marginLeft: `${(data.lv - 1) * 1.2}rem` }}
        >
          <div className={CommentStyle.commentUpperside}>
            <div className={CommentStyle.commentLeftPart}>
              <div className={CommentStyle.name}>
                {name} ({data.athrId})
              </div>
              {!isEditing ? (
                <div className={CommentStyle.content}>{data.cmmntCntnt}</div>
              ) : (
                <div className={CommentStyle.writeBox}>
                  <textarea
                    ref={modifyRef}
                    defaultValue={data.cmmntCntnt}
                    className={CommentStyle.modifyText}
                  />
                  <button
                    className={CommentStyle.submitBtn}
                    onClick={modifyCommentHandler}
                  >
                    등록
                  </button>
                </div>
              )}
            </div>
            <div className={CommentStyle.commentRightPart}>
              <div className={CommentStyle.dateBox}>
                <div className={CommentStyle.createDate}>{data.lstModDt}</div>
              </div>
              <div className={CommentStyle.functionLine} data-id={data.cmmntId}>
                {data.athrId === currUserEmail && (
                  <>
                    <input
                      className={CommentStyle.modifyCommentBtn}
                      type="button"
                      value="수정"
                      onClick={() => setIsEditing(!isEditing)} // 수정창 토글
                    />
                    <input
                      className={CommentStyle.deleteCommentBtn}
                      type="button"
                      value="삭제"
                      onClick={deleteCommentHandler}
                    />
                  </>
                )}
                <input
                  className={CommentStyle.recommentBtn}
                  type="button"
                  value="답글"
                  onClick={() => setIsReplying(!isReplying)} // 답글창 토글
                />
              </div>
            </div>
          </div>
          {isReplying && (
            <div className={CommentStyle.writeBox}>
              <textarea
                className={CommentStyle.recommentText}
                placeholder="답글을 입력하세요"
                ref={recommentRef}
              />
              <button
                className={CommentStyle.submitBtn}
                onClick={addReplyHandler}
              >
                등록
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className={CommentStyle.deletedComment}
          style={{ marginLeft: `${(data.lv - 1) * 1.2}rem` }}
        >
          삭제된 댓글입니다.
        </div>
      )}
    </>
  );
}
function maskName(name) {
  if (!name) return "";

  if (name.length === 1) {
    return name;
  }

  const firstChar = name.substring(0, 1);
  const lastChar = name.substring(name.length - 1);
  const middleMask = "*".repeat(name.length - 2);

  return firstChar + middleMask + lastChar;
}
