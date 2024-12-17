import React from "react";
import { useRef, useState } from "react";
import BoardViewStyle from "./CommentDefualt.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectComment,
  fetchAllProjectComments,
  removeProjectComment,
  updateProjectComment,
} from "../../../stores/thunks/projectCommentThunk";
import { useNavigate } from "react-router-dom";

export default function OneProjectComment({ commentData, projectId }) {
  const [isReplying, setIsReplying] = useState(false); // 답글 입력창 표시 여부
  const [isEditing, setIsEditing] = useState(false); // 수정 입력창 표시 여부
  const commentDispatcher = useDispatch();
  const modifyRef = useRef();
  const recommentRef = useRef();
  const jwt = useSelector((state) => ({ ...state.member }));
  const currUserEmail = jwt.info?.emilAddr;
  const navigate = useNavigate();

  const deleteCommentHandler = () => {
    commentDispatcher(removeProjectComment(commentData.pjCmmntId)).then(() => {
      commentDispatcher(fetchAllProjectComments(projectId));
      //navigate(`/project/info/${projectId}`);
    });
  };

  const modifyCommentHandler = () => {
    const fixedComment = {
      pjCmmntId: commentData.pjCmmntId,
      cmmntCntnt: modifyRef.current.value, // 수정 내용
    };
    commentDispatcher(updateProjectComment(fixedComment)).then(() => {
      commentDispatcher(fetchAllProjectComments(projectId));
      modifyRef.current.value = "";
      setIsEditing(false);
    });
    // 입력 필드 초기화
    // 수정창 닫기
  };
  const addReplyHandler = async () => {
    const newComment = {
      pjId: projectId,
      prntCmmntId: commentData.pjCmmntId,
      cmmntCntnt: recommentRef.current.value,
      athrId: currUserEmail,
    };

    commentDispatcher(createProjectComment(newComment))
      .then(() => {
        commentDispatcher(fetchAllProjectComments(projectId)); // 댓글 목록 새로고침
        recommentRef.current.value = "";
        setIsReplying(false);
      })
      .catch(() => alert("댓글 등록에 실패했습니다."));
  };

  return (
    <>
      {commentData.isDlt === "0" ? (
        <div
          className={BoardViewStyle.oneComment}
          style={{ marginLeft: `${(commentData.lv - 1) * 1.2}rem` }}
        >
          {/* 댓글 상단 영역 */}
          <div className={BoardViewStyle.commentBox}>
            <div className={BoardViewStyle.commentUpperside}>
              {/* 왼쪽 영역: 작성자 정보 및 댓글 내용 */}
              <div className={BoardViewStyle.commentLeftPart}>
                <div className={BoardViewStyle.name}>
                  {commentData.mbrNm} ({commentData.athrId})
                </div>
              </div>
              {/* 오른쪽 영역: 날짜와 버튼들 */}
              <div className={BoardViewStyle.commentRightPart}>
                <div className={BoardViewStyle.dateBox}>
                  <div className={BoardViewStyle.createDate}>
                    {commentData.lstModDt}
                  </div>
                </div>
                <div
                  className={BoardViewStyle.functionLine}
                  data-id={commentData.cmmntId}
                >
                  {commentData.athrId === currUserEmail && (
                    <>
                      <button
                        className={BoardViewStyle.modifyCommentBtn}
                        onClick={
                          () => {
                            setIsEditing(!isEditing); // 답글창 토글
                            setIsReplying(false); // 수정 상태 초기화
                          } // 답글창 토글
                        } // 수정창 토글
                      >
                        수정
                      </button>
                      <button
                        className={BoardViewStyle.deleteCommentBtn}
                        onClick={deleteCommentHandler}
                      >
                        삭제
                      </button>
                    </>
                  )}
                  <button
                    className={BoardViewStyle.recommentBtn}
                    onClick={() => {
                      setIsReplying(!isReplying); // 답글창 토글
                      setIsEditing(false); // 수정 상태 초기화
                    }} // 답글창 토글
                  >
                    답글
                  </button>
                </div>
              </div>
            </div>
            {!isEditing ? (
              <div className={BoardViewStyle.content}>
                {commentData.cmmntCntnt}
              </div>
            ) : (
              <div className={BoardViewStyle.modifyCommentBox}>
                <textarea
                  ref={modifyRef}
                  defaultValue={commentData.cmmntCntnt}
                  className={BoardViewStyle.modifyText}
                />
                <button
                  className={BoardViewStyle.submitBtn}
                  onClick={modifyCommentHandler}
                >
                  등록
                </button>
              </div>
            )}{" "}
          </div>
          {/* 답글 입력창 */}
          {isReplying && (
            <div className={BoardViewStyle.recommentBox}>
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
          style={{ marginLeft: `${(commentData.lv - 1) * 1.2}rem` }}
        >
          삭제된 댓글입니다.
        </div>
      )}
    </>
  );
}
