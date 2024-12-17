import { projectNewReply } from "../../alarm/socketSender";
import {
  getProjectCommentList,
  writeProjectComment,
  deleteProjectComment,
  modifyProjectComment,
} from "../../components/http/api/projectCommentApi";
import { projectCommentActions } from "../ToolkitStrore";

// 특정 게시글의 모든 댓글 가져오기
export const fetchAllProjectComments = (pjId) => async (dispatch) => {
  dispatch(projectCommentActions.startLoading());
  try {
    // `boardId`를 사용하여 API 호출
    const pjComments = await getProjectCommentList(pjId);

    dispatch(projectCommentActions.readProjectCommentSlice(pjComments)); // Redux 액션으로 데이터 전달
  } catch (error) {
    dispatch(
      projectCommentActions.setError(
        error.message || "프로젝트 댓글 목록을 가져오는데 실패했습니다."
      )
    );
  } finally {
    dispatch(projectCommentActions.endLoading());
  }
};

// 댓글 작성
export const createProjectComment = (newComment, pjId) => async (dispatch) => {
  dispatch(projectCommentActions.startLoading());
  try {
    const createdComment = await writeProjectComment(newComment);
    dispatch(projectCommentActions.writeProjectCommentSlice(createdComment));
  } catch (error) {
    dispatch(
      projectCommentActions.setError(
        error.message || "댓글 작성에 실패했습니다."
      )
    );
  } finally {
    dispatch(projectCommentActions.endLoading());
    projectNewReply(pjId);
  }
};

// 댓글 수정
export const updateProjectComment = (fixedcomment) => async (dispatch) => {
  dispatch(projectCommentActions.startLoading());
  try {
    const updatedComment = await modifyProjectComment(fixedcomment);
    dispatch(projectCommentActions.modifyProjectCommentSlice(updatedComment));
  } catch (error) {
    dispatch(
      projectCommentActions.setError(
        error.message || "댓글 수정에 실패했습니다."
      )
    );
  } finally {
    dispatch(projectCommentActions.endLoading());
  }
};

// 댓글 삭제
export const removeProjectComment = (commentId) => async (dispatch) => {
  dispatch(projectCommentActions.startLoading());
  try {
    await deleteProjectComment(commentId);
    dispatch(projectCommentActions.deleteProjectCommentSlice(commentId));
  } catch (error) {
    dispatch(
      projectCommentActions.setError(
        error.message || "댓글 삭제에 실패했습니다."
      )
    );
  } finally {
    dispatch(projectCommentActions.endLoading());
  }
};

export const resetProjectComments = () => (dispatch) => {
  dispatch(projectCommentActions.startLoading());
  try {
    dispatch(projectCommentActions.resetProjectCommentsSlice());
  } catch (error) {
    dispatch(
      projectCommentActions.setError(
        error.message || "댓글 초기화에 실패했습니다."
      )
    );
  } finally {
    dispatch(projectCommentActions.endLoading());
  }
};
