import {
  getBoardCommentList,
  writeBoardComment,
  modifyBoardComment,
  deleteBoardComment,
} from "../../components/http/api/boardCommentApi";
import { boardCommentActions } from "../ToolkitStrore";

// 특정 게시글의 모든 댓글 가져오기
export const fetchAllBoardComments = (boardId) => async (dispatch) => {
  dispatch(boardCommentActions.startLoading());
  try {
    console.log("Thunk");
    // `boardId`를 사용하여 API 호출
    const comments = await getBoardCommentList(boardId);

    console.log("this" + comments);

    dispatch(boardCommentActions.readBoardCommentList(comments)); // Redux 액션으로 데이터 전달
  } catch (error) {
    dispatch(
      boardCommentActions.setError(
        error.message || "댓글 목록을 가져오는데 실패했습니다."
      )
    );
  } finally {
    dispatch(boardCommentActions.endLoading());
  }
};

// 댓글 작성
export const createBoardComment = (newComment) => async (dispatch) => {
  dispatch(boardCommentActions.startLoading());
  try {
    const createdComment = await writeBoardComment(newComment);
    dispatch(boardCommentActions.createComment(createdComment));
  } catch (error) {
    dispatch(
      boardCommentActions.setError(error.message || "댓글 작성에 실패했습니다.")
    );
  } finally {
    dispatch(boardCommentActions.endLoading());
  }
};

// 댓글 수정
export const updateBoardComment = (comments) => async (dispatch) => {
  dispatch(boardCommentActions.startLoading());
  try {
    const updatedComment = await modifyBoardComment(comments);
    dispatch(boardCommentActions.modifyOneBoardComment(updatedComment));
  } catch (error) {
    dispatch(
      boardCommentActions.setError(error.message || "댓글 수정에 실패했습니다.")
    );
  } finally {
    dispatch(boardCommentActions.endLoading());
  }
};

// 댓글 삭제
export const removeBoardComment = (commentId) => async (dispatch) => {
  dispatch(boardCommentActions.startLoading());
  try {
    await deleteBoardComment(commentId);
    dispatch(boardCommentActions.deleteOneBoardComment(commentId));
  } catch (error) {
    dispatch(
      boardCommentActions.setError(error.message || "댓글 삭제에 실패했습니다.")
    );
  } finally {
    dispatch(boardCommentActions.endLoading());
  }
};
