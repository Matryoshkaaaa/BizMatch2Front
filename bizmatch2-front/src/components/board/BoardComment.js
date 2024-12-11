import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createBoardComment,
  updateBoardComment,
  removeBoardComment,
} from "../../stores/thunks/boardCommentThunk";
export default function BoardComment({ comment, loginInfo, BoardViewStyle }) {
  const [isReplying, setIsReplying] = useState(false); // 답글 입력창 표시 여부
  const [isEditing, setIsEditing] = useState(false); // 수정 입력창 표시 여부
  const commentDispatcher = useDispatch();
  const modifyRef = useRef();
  const recommentRef = useRef();

  const deleteCommentHandler = () => {
    commentDispatcher(removeBoardComment(comment.cmmntId));
  };

  const modifyCommentHandler = () => {
    commentDispatcher(
      updateBoardComment(comment.cmmntId, modifyRef.current.value)
    );
    setIsEditing(false); // 수정 완료 후 창 닫기
  };

  const addReplyHandler = () => {
    const newComment = {
      pstId: comment.boardId,
      prntCmmntId: comment.cmmntId,
      cmmntCntnt: recommentRef.current.value,
      athrId: loginInfo,
    };
    commentDispatcher(createBoardComment(newComment));
    setIsReplying(false); // 답글 등록 후 창 닫기
  };

  return comment.isDlt === "0" ? (
    <div
      className={BoardViewStyle.oneComment}
      style={{ marginLeft: `${(comment.lv - 1) * 1.2}rem` }}
    >
      <div className={BoardViewStyle.commentUpperside}>
        <div className={BoardViewStyle.commentLeftPart}>
          <div className={BoardViewStyle.name}>
            {comment.mbrNm} ({comment.athrId})
          </div>
          {!isEditing ? (
            <div className={BoardViewStyle.content}>{comment.cmmntCntnt}</div>
          ) : (
            <div className={BoardViewStyle.modifyWriteBox}>
              <textarea
                ref={modifyRef}
                defaultValue={comment.cmmntCntnt}
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
            <div className={BoardViewStyle.createDate}>{comment.lstModDt}</div>
          </div>
          <div
            className={BoardViewStyle.functionLine}
            data-id={comment.cmmntId}
          >
            {comment.athrId === loginInfo && (
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
      {isReplying && ( // 답글창 표시 여부에 따라 렌더링
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
      style={{ marginLeft: `${(comment.lv - 1) * 1.2}rem` }}
    >
      삭제된 댓글입니다.
    </div>
  );
}
